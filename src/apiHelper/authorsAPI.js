import { headers } from "../consts/index";
import { converToArray, sortFunction } from "../utils";
const authorsAPI = {
  loadAuthors: async () => {
    try {
      const request = await fetch(process.env.REACT_APP_API_URL + "authors", {
        method: "GET",
        headers: headers
      });
      const response = await request.json();
      if (response.message || response.error) {
        return { message: "Nie udało się pobrać autorów" };
      }
      if (typeof response === "object") {
        const converted = converToArray(response);

        return sortFunction(converted, "firstName");
      }
    } catch (e) {
      console.log(e);
      return { message: "Nie udało się pobrać autorów" };
    }
  },
  deleteAuthor: async id => {
    try {
      const request = await fetch(
        process.env.REACT_APP_API_URL + "authors/" + id,
        {
          method: "DELETE",
          headers: headers
        }
      );
      const response = await request.json();
      if (response.message || response.error) {
        return { message: "Nie udało się usunąc autora" };
      }
      return response;
    } catch (e) {
      return { message: "Nie udało się usunąc autora" };
    }
  },
  addAuthor: async payload => {
    try {
      if (!payload.firstName || !payload.lastName) {
        return { message: "Uzupełnij brakujące dane " };
      }
      if (
        typeof payload.firstName !== "string" ||
        typeof payload.lastName !== "string"
      ) {
        return { message: "Wprowadzono nie poprawne dane" };
      }
      const request = await fetch(process.env.REACT_APP_API_URL + "authors", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });
      const response = await request.json();
      if (response.message) {
        return { message: "Nie udało się dodać autora" };
      }

      return response;
    } catch (e) {
      return { message: "Nie udało się dodać autora" };
    }
  },
  editAuthor: async (payload, id) => {
    try {
      const request = await fetch(
        process.env.REACT_APP_API_URL + "authors/" + id,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(payload)
        }
      );
      const response = request.json();
      if (response.message) {
        return { message: "Nie udało się zaktualizować autora" };
      }
      return response;
    } catch (e) {
      return { message: "Nie udało się zaktualizować autora" };
    }
  },
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
