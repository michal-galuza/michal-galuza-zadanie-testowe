const headers = {
  "Content-Type": "application/json"
};
const authorsAPI = {
  loadAuthors: () =>
    fetch(process.env.REACT_APP_API_URL + "authors", {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(result => {
        if (typeof result === "object") {
          const arr = [];
          Object.keys(result).map(key => arr.push(result[key]));
          arr.sort((a, b) => a.lastName.localeCompare(b.lastName));
          return arr;
        }
        return result;
      })
      .catch(err => {
        return false;
      }),
  deleteAuthor: id => {
    fetch(process.env.REACT_APP_API_URL + "authors/" + id, {
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
  addAuthor: payload =>
    fetch(process.env.REACT_APP_API_URL + "authors", {
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
  editAuthor: (payload, id) =>
    fetch(process.env.REACT_APP_API_URL + "authors/" + id, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(result => result)
      .catch(err => {
        console.log(err);
        return false;
      }),
  getAuthorById: id =>
    fetch(process.env.REACT_APP_API_URL + "authors/" + id, {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(result => result)
      .catch(err => {
        console.log(err);
        return false;
      })
};
export default authorsAPI;
