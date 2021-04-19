import React, { FC, useState, MouseEvent, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListingOrderLabel from '../../organisms/OrderLabel/ListingOrderLabel';
import { ListingOrders } from '../../../types/interfaces/listings/ListingOrders';

/**
 * ListingOrderMenuProps
 */
type ListingOrderMenuProps = {
  order: ListingOrders;
  setOrder: (order: ListingOrders) => void;
  allowedOrderOptions?: ListingOrders[];
};

/**
 * ListingOrderMenu
 *
 * @constructor
 */
const ListingOrderMenu: FC<ListingOrderMenuProps> = ({ order, setOrder, allowedOrderOptions = [] }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /**
   * handleOpen
   *
   * @param event
   */
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * handleClose
   *
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * handleChoose
   *
   * @param order
   */
  const handleChoose = (order: ListingOrders) => {
    setOrder(order);
    setAnchorEl(null);
  };

  /**
   * orderOpts
   */
  const orderOpts: (orderType: ListingOrders) => null | JSX.Element = useCallback(
    (orderType: ListingOrders) => {
      // empty limit array means all standard options available

      if (allowedOrderOptions.length > 0 && !allowedOrderOptions.includes(orderType)) {
        return null;
      }
      return (
        <MenuItem key={orderType} onClick={() => handleChoose(orderType)}>
          <ListingOrderLabel orderType={orderType} current={order} />
        </MenuItem>
      );
    },
    [allowedOrderOptions],
  );

  return (
    <div className="orderButton">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpen}>
        {!order || order === ListingOrders.Unspecified ? 'Order by' : <ListingOrderLabel orderType={order} />}
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {Object.keys(ListingOrders)
          .map(key => orderOpts(ListingOrders[key]))
          .filter(el => el != null)}
      </Menu>
    </div>
  );
};

export default ListingOrderMenu;
