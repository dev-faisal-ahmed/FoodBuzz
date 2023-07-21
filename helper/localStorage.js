export function cartSaveToLocal(data) {
  localStorage.setItem('cart-data', JSON.stringify(data));
}

export function cartGetToLocal() {
  let data = localStorage.getItem('cart-data');
  data = JSON.parse(data);
  return data;
}

export function setUserInfoLocal({ email, image, role, name }) {
  localStorage.setItem(
    'user-info',
    JSON.stringify({ email, image, role, name })
  );
}

export function getUserInfoLocal() {
  const data = localStorage.getItem('user-info');
  const { email, image, role, name } = JSON.parse(data);
  return { email, image, role, name };
}

export function deleteUserInfoFromLocal() {
  localStorage.removeItem('user-info');
}
