import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  max-width: 1180px;
  height: 72px;
  margin: 18px auto 0;
  padding: 0 28px;

  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(232, 222, 219, 0.9);
  border-radius: 22px;
  box-shadow: 0 8px 24px rgba(43, 36, 36, 0.06);
  backdrop-filter: blur(12px);

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 700px) {
    margin: 12px 16px 0;
    padding: 0 20px;
  }
`;

const Logo = styled(Link)`
  font-size: 25px;
  font-weight: 600;
  letter-spacing: -1px;

  color: #2b2424;
  text-decoration: none;

  transition: color 0.2s ease;

  &:hover {
    color: #9b7777;
  }
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

  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: #c28f91;
  }

  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: -7px;
    left: 0;
    height: 1px;
    background: #c28f91;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.2s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const StartButton = styled(Link)`
  padding: 12px 20px;

  background: #2b2424;
  color: white;

  border-radius: 25px;

  text-decoration: none;
  font-size: 14px;

  box-shadow: 0 5px 12px rgba(43, 36, 36, 0.16);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: #423737;
    box-shadow: 0 8px 16px rgba(43, 36, 36, 0.2);
    transform: translateY(-1px);
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
