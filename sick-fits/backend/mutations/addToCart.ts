/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productID }: { productID: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // 1. check user sign in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current users cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productID } },
    resolveFields: 'id,quantity',
  });
  const [existingCartItem] = allCartItems;
  // if exist increase 1
  if (existingCartItem) {
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: existingCartItem.quantity + 1,
      },
    });
  }
  // if don't, create 1
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productID } },
      user: { connect: { id: sesh.itemId } },
    },
  });
}

export { addToCart };
