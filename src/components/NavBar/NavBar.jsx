import { useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { setMessage } from "../../state/message/message";

export default function NavBar() {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispath = useDispatch();

  return (
    <Nav>
      {pathname === "/" ||
      pathname === "/publishers" ||
      pathname === "/books" ? (
        ""
      ) : (
        <BackButton
          onClick={() => {
            dispath(setMessage());
            return history.goBack();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
            <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
          </svg>{" "}
          Powrót
        </BackButton>
      )}
      <NavItem exact to="/">
        Autorzy
      </NavItem>{" "}
      <NavItem to="/publishers">Wydawnictwa</NavItem>
      <NavItem to="/books">Ksiązki</NavItem>
    </Nav>
  );
}
const Nav = styled.nav`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  background-color: ${({ theme }) => theme.defaultBackground};
  box-shadow: 0 0 7px 3px grey;
  padding: 5px;
`;
const NavItem = styled(NavLink)`
  position: relative;
  padding: 0 6px;
  height: 35px;
  background-color: transparent;
  color: black;
  text-decoration: none;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 4px;
  cursor: pointer;

  &.active {
    ::after {
      content: " ";
      position: absolute;
      z-index: 2;
      top: calc(100% - 3px);
      left: 50%;
      height: 3px;
      width: 50px;
      transform: translateX(-50%);
      background: ${({ theme }) => theme.buttonColor};
    }
  }
`;
const BackButton = styled.button`
  background-color: white;
  outline: none;
  border: 0px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
