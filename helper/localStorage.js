export function cartSaveToLocal(data) {
  localStorage.setItem('cart-data', JSON.stringify(data));
}

export function cartGetToLocal() {
  let data = localStorage.getItem('cart-data');
  data = JSON.parse(data);
  return data;
}

export function userInfoSaveToLocal(data) {
  const userData = userInfoGetToLocal();
  localStorage.setItem('user-data', JSON.stringify({ ...userData, ...data }));
}

export function userInfoGetToLocal() {
  let data = localStorage.getItem('user-data');
  data = JSON.parse(data);
  return data;
}

export function userInfoDeleteFromLocal() {
  localStorage.removeItem('user-data');
}
