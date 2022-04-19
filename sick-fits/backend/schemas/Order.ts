import {
  integer,
  relationship,
  select,
  text,
  virtual,
} from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import formatMoney from '../lib/formatMoney';

interface ItemInterface {
  total: number;
}

export const Order = list({
  // TODO
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver: (item: ItemInterface) => formatMoney(item?.total),
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
