import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  max-width: 1280px;
  height: 90px;
  margin: 0 auto;
  padding: 0 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 700px) {
    padding: 0 25px;
  }
`;

const Logo = styled(Link)`
  font-size: 25px;
  font-weight: 600;
  letter-spacing: -1px;

  color: #2b2424;
  text-decoration: none;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #5f5353;
  text-decoration: none;
  font-size: 14px;

  transition: color 0.2s ease;

  &:hover {
    color: #c28f91;
  }
`;

const StartButton = styled(Link)`
  padding: 12px 20px;

  background: #2b2424;
  color: white;

  border-radius: 25px;

  text-decoration: none;
  font-size: 14px;

  transition: all 0.2s ease;

  &:hover {
    background: #423737;
  }
`;

function Navbar() {
  return (
    <Nav>
      <Logo to="/">BeautyPlan</Logo>

      <Links>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/beauty-plan">Beauty Plan</NavLink>
        <StartButton to="/beauty-plan">
          Get Started
        </StartButton>
      </Links>
    </Nav>
  );
}

export default Navbar;