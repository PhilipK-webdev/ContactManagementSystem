import styled, { keyframes } from "styled-components";
const AlertMessage = ({ text, color }) => {
  return (
    <div style={{ position: "relative", marginBottom: "10px" }}>
      <AlertStyle color={color}>{text}</AlertStyle>
    </div>
  );
};
const myMoveAnimation = keyframes`
  from {
    left: 0px;
  }
  to {
    left: 300px;
  }
`;
const AlertStyle = styled.div`
  position: absolute;
  left: 10px;
  top: -60px;
  background-color: ${(props) => props.color};
  color: white;
  padding: 5px;
  border-radius: 10px;
  width: 175px;
  text-align: center;
  text-transform: uppercase;
  font-size: 13px;
  animation: mymove 1s;
  animation-fill-mode: forwards;
  animation: ${myMoveAnimation} 5s linear infinite;
`;

export default AlertMessage;
