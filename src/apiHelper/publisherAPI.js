import { headers } from "@/const/index";
const publishersAPI = {
  loadPublishers: () =>
    fetch(process.env.REACT_APP_API_URL + "publishers", {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(result => result)
      .catch(err => {
        console.log(err);
        return false;
      }),
  deletePublisher: id =>
    fetch(process.env.REACT_APP_API_URL + "publishers/" + id, {
      method: "DELETE",
      headers: headers
    })
      .then(res => res.json())
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
        return false;
      }),
  addPublisher: payload =>
    fetch(process.env.REACT_APP_API_URL + "publishers", {
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
  editPublisher: (payload, id) =>
    fetch(process.env.REACT_APP_API_URL + "publishers/" + id, {
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
export default publishersAPI;
