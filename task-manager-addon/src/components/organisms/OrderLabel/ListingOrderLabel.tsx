import React, { FC } from 'react';
import Asc from '../../atoms/Order/Asc';
import Desc from '../../atoms/Order/Desc';
import { ListingOrders } from '../../../types/interfaces/listings/ListingOrders';

/**
 * ListingOrderLabel
 *
 * @param orderType
 * @param current
 * @constructor
 */
const ListingOrderLabel: FC<{ orderType: ListingOrders; current?: ListingOrders | null }> = ({
  orderType,
  current = null,
}) => {
  const color = (expected: ListingOrders) => {
    return expected === current ? 'primary' : 'inherit';
  };

  switch (orderType) {
    case ListingOrders.AddedDateAsc:
      return <Asc inputLabel="Added date" titleAccess="oldest first" color={color(ListingOrders.AddedDateAsc)} />;

    case ListingOrders.AddedDateDesc:
      return <Desc inputLabel="Added date" titleAccess="newest first" color={color(ListingOrders.AddedDateDesc)} />;

    case ListingOrders.PinnedDateAsc:
      return <Asc inputLabel="Pinned date" titleAccess="oldest first" color={color(ListingOrders.PinnedDateAsc)} />;

    case ListingOrders.PinnedDateDesc:
      return <Desc inputLabel="Pinned date" titleAccess="newest first" color={color(ListingOrders.PinnedDateDesc)} />;

    case ListingOrders.Unspecified:
    default:
      return <>Unspecified</>;
  }
};

export default ListingOrderLabel;
