export function calculateTotal(cartList) {
  let subTotal = 0;

  if (cartList.length === 0) return 0;

  cartList.forEach((data) => {
    subTotal += data.price * data.count;
  });
  return subTotal;
}

export function isCardAdded(cartList, id) {
  const selectedCart = cartList.filter((data) => data.id === id);
  if (selectedCart.length === 0) return false;
  return true;
}
