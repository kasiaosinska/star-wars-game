const baseUrl = 'https://swapi.co/api/';

const checkResponseStatus = response => {
  if (response.ok) return response;
  throw new Error(response.statusText);
};

export const fetchPeople = () =>
  fetch(`${baseUrl}people`)
    .then(checkResponseStatus)
    .then(response => response.json())
    .catch(error => Promise.reject(error));

export const fetchPerson = id =>
  fetch(`${baseUrl}people/${id}`)
    .then(checkResponseStatus)
    .then(response => response.json())
    .catch(error => Promise.reject(error));

export const fetchStarships = () =>
  fetch(`${baseUrl}starships`)
    .then(checkResponseStatus)
    .then(response => response.json())
    .catch(error => Promise.reject(error));

export const fetchStarship = id =>
  fetch(`${baseUrl}starships/${id}`)
    .then(checkResponseStatus)
    .then(response => response.json())
    .catch(error => Promise.reject(error));
