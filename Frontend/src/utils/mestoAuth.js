export const BASE_URL = 'https://api.sedrakyan.mesto.nomoredomains.icu';

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    return getResponse(res);
  })
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    return getResponse(res);
  })
};

export const validityToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  .then((res) => {
    return getResponse(res);
  })
}

export const signOut = async () => {
  await fetch(`${BASE_URL}/signout`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((res) => {
    return getResponse(res);
  })
};
