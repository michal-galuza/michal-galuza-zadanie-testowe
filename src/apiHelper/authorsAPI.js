import { headers } from "../consts/index";
export const authorsAPI = {
  loadAuthors: () =>
    fetch(process.env.REACT_APP_API_URL + "authors", {
      method: "GET",
      headers: headers
    }),
  deleteAuthor: id =>
    fetch(process.env.REACT_APP_API_URL + "authors/" + id, {
      method: "DELETE",
      headers: headers
    }),
  addAuthor: payload =>
    fetch(process.env.REACT_APP_API_URL + "authors", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    }),
  editAuthor: payload =>
    fetch(process.env.REACT_APP_API_URL + "authors/" + payload.id, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(payload)
    })
};
const apiHelperAuthors = async (req, payload, message) => {
  try {
    const makeRequest = await authorsAPI[req](payload);
    const getResponse = await makeRequest.json();
    if (getResponse.message) {
      if (getResponse.message === "The author has at least one book") {
        return {
          message:
            "Nie można usunąć autora ponieważ są do niego przypisane książki."
        };
      }
      return { message };
    }
    return getResponse;
  } catch (e) {
    return { message };
  }
};
export default apiHelperAuthors;
