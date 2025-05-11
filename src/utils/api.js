const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Error: ${res.status}`));
};

const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
  }).then(checkResponse);
};

const addItems = (inputData = {}) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputData.name,
      imageUrl: inputData.imageUrl,
      weather: inputData.weather,
    }),
  }).then(checkResponse);
};

const deleteItem = (item) => {
  return fetch(`${baseUrl}/items/${item}`, {
    method: "DELETE",
  }).then(checkResponse);
};

export { getItems, addItems, deleteItem };
