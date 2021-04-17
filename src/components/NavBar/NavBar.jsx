import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function NavBar() {
  return (
    <Nav>
      {" "}
      <NavItem exact to="/">
        Start
      </NavItem>
      <NavItem to="/books">Ksiązki</NavItem>
      <NavItem to="/authors">Autorzy</NavItem>
      <NavItem to="/publishers">Wydawnictwa</NavItem>
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
  background-color: white;
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
      background: orange;
    }
  }
`;
