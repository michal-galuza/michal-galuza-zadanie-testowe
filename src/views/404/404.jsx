import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function notFound() {
  return (
    <Wrapper>
      <h1>404 | Not found</h1>
      <Back to="/">Wróć</Back>
    </Wrapper>
  );
}
const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Back = styled(NavLink)`
  font-size: 1.3rem;
  margin-top: 7px;
`;
