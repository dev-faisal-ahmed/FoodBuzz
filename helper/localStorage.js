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
  let data = localStorage.getItem('user-info');
  data = JSON.parse(data);
  return {
    email: data?.email,
    image: data?.image,
    role: data?.role,
    name: data?.name,
  };
}

export function deleteUserInfoFromLocal() {
  localStorage.removeItem('user-info');
}
