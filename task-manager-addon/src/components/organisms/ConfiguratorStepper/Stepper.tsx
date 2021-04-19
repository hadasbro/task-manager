/* eslint-disable */
import React, { FC, ReactNode, useContext, useState, MouseEvent, useEffect } from 'react';
import { useConfiguratorStyles } from '../../../styles/styles/modules';
import GeneralException from '../../../exceptions/system/GeneralException';
import JustifiedBox from '../../atoms/CenteredBox/JustifiedBox';
import { default as MUStepper } from '@material-ui/core/Stepper';
import { default as MUStep } from '@material-ui/core/Step';
import { default as MUStepLabel } from '@material-ui/core/StepLabel';
import { Alert as MUAlert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { configuratorContextDefault } from '../../../contexts/configurator/defaults';
import { ControlsContext, DataContext } from '../../../contexts/configurator/types';
import { ConfiguratorContext } from '../../../contexts/configurator/ConfiguratorContext';
import { isDefined } from '../../../types/guards/general/isDefined';
import { Nullable } from '../../../types/templates/Nullable';

/**
 * StepHandler
 *
 * StepType handler (next, prev, skip)
 *
 * if handler throw StoreException then apploggerUserAlert will be presented
 * in the Stepper and further steps executed until handler return true
 *
 * another posibility to block further processing is to just return false
 * from handler
 *
 */
type StepHandler = (currentStep?: number) => boolean;

/**
 * StepType
 */
interface StepType {
  label: string;
  optional: boolean;
  component: () => ReactNode;
}

/**
 * Alert
 *
 * @constructor
 */
const Alert: FC = () => {
  const {
    controls: { alert },
  } = useContext(ConfiguratorContext);
  return alert ? <MUAlert severity="error">{alert}</MUAlert> : null;
};

/**
 * StepsLine
 *
 * @constructor
 */
const StepsLine: FC = () => {
  const {
    controls: { steps, activeStep, skipped },
  } = useContext(ConfiguratorContext);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  return (
    <MUStepper activeStep={activeStep}>
      {steps.map(({ label, optional }, index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: { optional?: ReactNode } = {};

        if (optional) {
          labelProps.optional = <Typography variant="caption">Optional</Typography>;
        }

        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }

        return (
          <MUStep key={label} {...stepProps}>
            <MUStepLabel {...labelProps}>{label}</MUStepLabel>
          </MUStep>
        );
      })}
    </MUStepper>
  );
};

/**
 * Controls
 *
 * @param validateNext
 * @param validatePrev
 * @param validateSkip
 * @constructor
 */
const Controls: FC<{
  validateNext?: StepHandler;
  validatePrev?: StepHandler;
  validateSkip?: StepHandler;
}> = ({ validateNext, validatePrev, validateSkip }) => {
  const {
    controls: { steps, activeStep },
    handlers: { handleBack, handleSkip, handleNext, setAlert },
  } = useContext(ConfiguratorContext);

  const isStepOptional = (step: number) => {
    return steps.length ? steps[step].optional : false;
  };

  const classes = useConfiguratorStyles();

  /**
   * handleNextButton
   */
  const handleNextButton = () => {
    try {
      if (!isDefined(validateNext) || validateNext()) {
        handleNext(); // event TODO
      }

      setAlert(null);
    } catch (ex) {
      setAlert(ex.message);
    }
  };

  /**
   * handleBackButton
   */
  const handleBackButton = () => {
    try {
      if (!isDefined(validatePrev) || validatePrev()) {
        handleBack(); // event TODO
      }

      setAlert(null);
    } catch (ex) {
      setAlert(ex.message);
    }
  };

  /**
   * handleSkipButton
   */
  const handleSkipButton = () => {
    try {
      if (!isDefined(validateSkip) || validateSkip()) {
        handleSkip(); // event TODO
      }

      setAlert(null);
    } catch (ex) {
      setAlert(ex.message);
    }
  };

  return (
    <JustifiedBox cssProperties={{ paddingBottom: 100 }}>
      <>
        <Button disabled={activeStep === 0} onClick={handleBackButton} className={classes.button}>
          Back
        </Button>
        {isStepOptional(activeStep) && (
          <Button variant="contained" color="primary" onClick={handleSkipButton} className={classes.button}>
            Skip
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={handleNextButton} className={classes.button}>
          {activeStep === steps.length - 1 ? 'Finish and confirm' : 'Next'}
        </Button>
      </>
    </JustifiedBox>
  );
};

/**
 * Step
 *
 * @param render
 * @constructor
 */
const Step: FC<{ render: (step: number) => ReactNode }> = ({ render }) => {
  const {
    controls: { activeStep },
  } = useContext(ConfiguratorContext);

  return <>{render(activeStep)}</>;
};

/**
 * Stepper
 *
 * @param children
 * @param steps
 * @constructor
 */
const Stepper: FC<{
  resetButton?: boolean;
  steps: StepType[];
}> = ({ children, steps }) => {
  const [controls, setControls] = useState<ControlsContext>(configuratorContextDefault.controls);
  const [data, setData] = useState<DataContext>(configuratorContextDefault.data);

  useEffect(() => {
    setControls(prev => {
      return { ...prev, steps };
    });
  }, [steps]);

  /**
   * setAlert
   *
   * @param msg - null means reset alert
   */
  const setAlert = (msg: Nullable<string>) => {
    setControls(prev => {
      return { ...prev, alert: msg };
    });
  };

  /**
   * updateData
   *
   * @param data
   */
  const updateData = (data: Partial<DataContext>) => {
    setData(prev => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  /**
   * isStepOptional
   *
   * @param step
   */
  const isStepOptional = (step: number) => {
    return steps[step].optional;
  };

  /**
   * isStepSkipped
   * noinspection JSUnusedLocalSymbols
   * @param step
   */
  const isStepSkipped = (step: number) => {
    return controls.skipped.has(step);
  };

  /**
   * isLastStep
   *
   * @param step
   */
  const isLastStep = (step: number) => {
    return steps.length - 1 === step;
  };

  /**
   * isReset
   */
  const isReset = () => {
    return false;
  };

  /**
   * handleNext
   */
  const handleNext = () => {
    try {
      if (!isReset() && isLastStep(controls.activeStep)) {
        // noinspection ExceptionCaughtLocallyJS
        throw new GeneralException("You can't skip a step that isn't optional.");
      }

      setControls(prev => {
        const newSkipped = new Set(prev.skipped.values());
        newSkipped.delete(prev.activeStep);

        return {
          ...prev,
          alert: null,
          skipped: newSkipped,
          activeStep: prev.activeStep + 1,
        };
      });
    } catch (ex) {
      setAlert(ex.message);
    }
  };

  /**
   * handleBack
   */
  const handleBack = () => {
    try {
      setControls(prev => {
        return {
          ...prev,
          alert: null,
          activeStep: prev.activeStep - 1,
        };
      });
    } catch (ex) {
      setAlert(ex.message);
    }
  };

  /**
   * handleSkip
   */
  const handleSkip = () => {
    try {
      if (!isStepOptional(controls.activeStep)) {
        // noinspection ExceptionCaughtLocallyJS
        throw new GeneralException("You can't skip a step that isn't optional.");
      }

      if (!isReset() && isLastStep(controls.activeStep)) {
        // noinspection ExceptionCaughtLocallyJS
        throw new GeneralException("You can't skip a step that isn't optional.");
      }

      setControls(prev => {
        const newSkipped = new Set(prev.skipped.values());
        newSkipped.add(prev.activeStep);

        return {
          ...prev,
          alert: null,
          skipped: newSkipped,
          activeStep: prev.activeStep + 1,
        };
      });
    } catch (ex) {
      setAlert(ex.message);
    }
  };

  /**
   * handleReset
   */
  const handleReset = () => {
    setControls(prev => {
      return {
        ...prev,
        activeStep: 0,
      };
    });
  };

  return (
    <ConfiguratorContext.Provider
      value={{
        handlers: {
          handleBack,
          handleSkip,
          handleReset,
          handleNext,
          setAlert,
          setData,
          updateData,
        },
        controls,
        data,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

export { Stepper, Alert, StepsLine, Controls, Step };
export type { StepType };
