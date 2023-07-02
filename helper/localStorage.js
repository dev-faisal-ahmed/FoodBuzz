export function cartSaveToLocal(data) {
  localStorage.setItem('cart-data', JSON.stringify(data));
}

export function cartGetToLocal() {
  let data = localStorage.getItem('cart-data');
  data = JSON.parse(data);
  return data;
}
