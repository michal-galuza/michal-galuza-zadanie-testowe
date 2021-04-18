import { headers } from "../consts/index";
export const booksAPI = {
  loadBooks: () =>
    fetch(process.env.REACT_APP_API_URL + "books", {
      method: "GET",
      headers: headers
    }),
  deleteBook: id =>
    fetch(process.env.REACT_APP_API_URL + "books/" + id, {
      method: "DELETE",
      headers: headers
    }),
  addBook: payload =>
    fetch(process.env.REACT_APP_API_URL + "books", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    }),
  editBook: payload =>
    fetch(process.env.REACT_APP_API_URL + "books/" + payload.id, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(payload)
    })
};
const apiHelperBooks = async (req, payload, message) => {
  try {
    const makeRequest = await booksAPI[req](payload);
    const getResponse = await makeRequest.json();
    if (getResponse.message) {
      return { message };
    }
    return getResponse;
  } catch (e) {
    return { message };
  }
};
export default apiHelperBooks;
