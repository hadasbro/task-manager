const { useBabelRc, override } = require('customize-cra');

// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc());

// const { override, addDecoratorsLegacy } = require('customize-cra');
//
// // Adds legacy decorator support to the Webpack configuration.
// module.exports = override(addDecoratorsLegacy());
//
