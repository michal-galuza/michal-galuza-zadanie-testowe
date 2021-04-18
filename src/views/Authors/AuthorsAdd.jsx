import { useState } from "react";
import { useDispatch } from "react-redux";
import apiHelperAuthors from "../../apiHelper/authorsAPI";
import Form from "../../components/Form/Form";
import Layout from "../../components/LayoutWrapper/Layout";
import { addNewAuthor } from "../../state/authors/authors";

export default function AuthorsAdd() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  function submit({ firstName, lastName }, clearForm) {
    if (!firstName || !lastName) {
      return setMessage("Wypełnij brakujące dane.");
    }
    setMessage("Dodaje autora");

    apiHelperAuthors(
      "addAuthor",
      { firstName, lastName },
      "Nie udało się dodać autora"
    ).then(res => {
      if (res.message) {
        return setMessage(res.message);
      }
      setMessage(
        "Poprawnie dodano nowego autora: " + res.firstName + " " + res.lastName
      );
      clearForm();
      return dispatch(addNewAuthor(res));
    });
  }
  return (
    <Layout title="Dodawanie autorów" pathToBack="/" message={message}>
      <Form submitFn={submit} />
    </Layout>
  );
}
