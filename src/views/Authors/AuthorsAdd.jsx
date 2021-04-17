import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import authorsAPI from "../../apiHelper/authorsAPI";
import Title from "../../components/Title/Title";
import { loadingStatus } from "../../consts";
import { addNewAuthor, setStatus } from "../../state/authors/authors";
import { messageState, setMessage } from "../../state/message/message";

export default function AuthorsAdd() {
  const message = useSelector(messageState);
  const initalFormState = { firstName: "", lastName: "" };
  const [formState, setFormState] = useState(initalFormState);
  const dispatch = useDispatch();
  function submit(e) {
    e.preventDefault();
    dispatch(setMessage("Dodaje ..."));
    dispatch(setStatus(loadingStatus.LOADING));
    authorsAPI.addAuthor(formState).then(res => {
      if (res.message) {
        return dispatch(setMessage(res.message));
      }
      dispatch(
        setMessage(
          "Poprawnie dodano nowego autora:" + res.firstName + " " + res.lastName
        )
      );

      setFormState(initalFormState);
      return dispatch(addNewAuthor(res));
    });
  }
  return (
    <Wrapper>
      <Title text="Dodaj autora" message={message} />

      <Form onSubmit={e => submit(e)}>
        <label>
          Imię
          <input
            type="text"
            required
            value={formState.firstName}
            onChange={e => {
              setFormState({ ...formState, firstName: e.target.value });
            }}
          />
        </label>

        <label>
          Nazwisko
          <input
            type="text"
            required
            value={formState.lastName}
            onChange={e => {
              setFormState({ ...formState, lastName: e.target.value });
            }}
          />
        </label>
        <button type="submit">Zapisz</button>
      </Form>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Form = styled.form`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 200px;
  label {
    width: 300px;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    font-size: 1.3rem;
    input {
      width: 100%;
      height: 50px;
      padding-left: 7px;
      font-size: 1.3rem;
    }
  }
  button {
    width: 150px;
    background-color: orange;
    height: 40px;
    color: white;
    border: 0px;
    font-size: 1.4rem;
  }
`;
