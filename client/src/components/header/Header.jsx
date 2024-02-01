import styled from "styled-components";
const TITLE = "Contact Management System";
const Header = () => {
  return (
    <HeaderStyle>
      <h1>{TITLE}</h1>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  height: 100px;
  width: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #265fa9;
    @media (max-width: 820px) {
      font-size: 20px;
    }
  }
`;
export default Header;
