import styled from "styled-components";
const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer">
        <span>👽👾🤖😈</span>
      </div>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  .footer {
    color: #265fa9;
  }
`;
export default Footer;
