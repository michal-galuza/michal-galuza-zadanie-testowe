import { headers } from "@/const/index";
const booksAPI = {
  loadBooks: () =>
    fetch(process.env.REACT_APP_API_URL + "books", {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(result => {
        const arr = [];
        Object.keys(result).map(key => arr.push(result[key]));
        arr.sort((a, b) => a.title.localeCompare(b.title));
        return arr;
      })
      .catch(err => {
        console.log(err);
        return false;
      }),
  deleteBook: id => {
    fetch(process.env.REACT_APP_API_URL + "books/" + id, {
      method: "DELETE",
      headers: headers
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  },
  addBook: payload =>
    fetch(process.env.REACT_APP_API_URL + "books", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(result => result)
      .catch(err => {
        console.log(err);
        return false;
      }),
  editBook: (payload, id) =>
    fetch(process.env.REACT_APP_API_URL + "books/" + id, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(result => result)
      .catch(err => {
        console.log(err);
        return false;
      })
};
export default booksAPI;
