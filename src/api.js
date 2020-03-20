const baseUrl = 'https://swapi.co/api';

const checkResponseStatus = response => {
  if (response.ok) return response;
  throw new Error(response.statusText);
};

export const fetchAllPlayers = type =>
  fetch(`${baseUrl}/${type}`)
    .then(checkResponseStatus)
    .then(response => response.json())
    .catch(error => Promise.reject(error));

export const fetchPlayer = (type, id) =>
  fetch(`${baseUrl}/${type}/${id}`)
    .then(checkResponseStatus)
    .then(response => response.json())
    .catch(error => Promise.reject(error));
