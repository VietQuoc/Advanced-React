export default function calcTotalPrice(cart) {
  if (!cart) return 0;
  return cart.reduce((tally, cartItem) => {
    if (!cartItem?.product) return tally; // product can be deleted, but they could still be in your cart
    return tally + cartItem?.quantity * cartItem?.product?.price;
  }, 0);
}
