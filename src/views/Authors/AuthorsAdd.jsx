import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import authorsAPI from "../../apiHelper/authorsAPI";
import Form from "../../components/Form/Form";
import Title from "../../components/Title/Title";
import { loadingStatus } from "../../consts";
import { addNewAuthor, setStatus } from "../../state/authors/authors";
import { messageState, setMessage } from "../../state/message/message";

export default function AuthorsAdd() {
  const message = useSelector(messageState);
  const dispatch = useDispatch();
  function submit(formData, clearForm) {
    console.log(formData);
    dispatch(setMessage("Dodaje ..."));
    dispatch(setStatus(loadingStatus.LOADING));
    authorsAPI.addAuthor(formData).then(res => {
      if (res.message) {
        return dispatch(setMessage(res.message));
      }
      dispatch(
        setMessage(
          "Poprawnie dodano nowego autora: " +
            res.firstName +
            " " +
            res.lastName
        )
      );

      clearForm();
      return dispatch(addNewAuthor(res));
    });
  }
  return (
    <Wrapper>
      <Title text="Dodaj autora" message={message} />
      <Form submitFn={submit} />
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
