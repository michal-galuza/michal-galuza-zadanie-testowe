import { useMemo } from "react";
import { useState } from "react";
import styled from "styled-components";

export default function Form({
  submitFn,
  inputs = [
    { title: "Imię", name: "firstName", type: "text", isRequired: true, d: "" },
    {
      title: "Nazwisko",
      name: "lastName",
      type: "text",
      isRequired: true,
      d: ""
    }
  ],
  buttonText = "Zapisz"
}) {
  const memo = useMemo(() => {
    const initialValue = {};
    inputs.map(item => (initialValue[item.name] = ""));
    return { inputs, initialValue };
  }, [inputs]);
  const [formState, setFormState] = useState(memo.initialValue);

  function change(value, name) {
    setFormState({ ...formState, [name]: value });
  }
  function clearForm() {
    setFormState(memo.initialValue);
  }
  function submitForm(e) {
    e.preventDefault();
    submitFn(formState, clearForm);
  }
  return (
    <FormStyled onSubmit={e => submitForm(e)}>
      {memo.inputs.map((item, index) => (
        <label key={"LabelNr" + index + item.name}>
          {item.title}
          <input
            type={item.type}
            required={item.isRequired}
            name={item.name}
            value={formState[item.name]}
            onChange={e => change(e.target.value, item.name)}
            placeholder={item.d}
          />
        </label>
      ))}
      <button>{buttonText}</button>
    </FormStyled>
  );
}
const FormStyled = styled.form`
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
    background-color: ${({ theme }) => theme.buttonColor};
    height: 40px;
    color: white;
    border: 0px;
    font-size: 1.4rem;
  }
`;
