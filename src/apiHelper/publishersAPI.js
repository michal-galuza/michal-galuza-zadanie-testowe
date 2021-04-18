import { headers } from "../consts/index";
export const publishersAPI = {
  loadPublishers: () =>
    fetch(process.env.REACT_APP_API_URL + "publishers", {
      method: "GET",
      headers: headers
    }),
  deletePublisher: payload =>
    fetch(process.env.REACT_APP_API_URL + "publishers/" + payload, {
      method: "DELETE",
      headers: headers
    }),
  addPublisher: payload =>
    fetch(process.env.REACT_APP_API_URL + "publishers", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    }),
  editPublisher: payload =>
    fetch(process.env.REACT_APP_API_URL + "publishers/" + payload.id, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        name: payload.name,
        establishmentYear: payload.year
      })
    })
};
const apiHelperPublishers = async (req, payload, message) => {
  try {
    const makeRequest = await publishersAPI[req](payload);
    const getResponse = await makeRequest.json();
    if (getResponse.message) {
      return { message };
    }
    return getResponse;
  } catch (e) {
    return { message };
  }
};
export default apiHelperPublishers;
