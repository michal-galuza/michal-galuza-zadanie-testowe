import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiHelperAuthors from "../../apiHelper/authorsAPI";
import Form from "../../components/Form/Form";
import Layout from "../../components/LayoutWrapper/Layout";
import { addNewAuthor, authorsState } from "../../state/authors/authors";

export default function AuthorsAdd() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { authors } = useSelector(authorsState);
  function submit({ firstName, lastName }, clearForm) {
    if (!firstName || !lastName) {
      return setMessage("Wypełnij brakujące dane.");
    }
    setMessage("Dodaje autora");

    if (
      authors.length > 0 &&
      authors.findIndex(
        item => item.firstName === firstName && item.lastName === lastName
      ) !== -1
    ) {
      return setMessage("Istnieje już taki autor");
    }

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
    <Layout title="Dodaj autora" pathToBack="/" message={message}>
      <Form submitFn={submit} />
    </Layout>
  );
}
