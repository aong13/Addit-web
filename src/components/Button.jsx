import styled from "styled-components";

export const Button = ({ text, icon, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {text}
      <Icon src={icon} />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  margin-top: 20px;
  display: flex;
  color: #7fa3ff;
  font-size: 12px;
  font-weight: 600;
  padding: 10px 0;
  background-color: transparent;
  border: 1px solid #7fa3ff;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  max-width: 200px;

  //추후수정
  /* &:hover {
    border-width: 2px;
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    border-width: 2px;
  } */
`;

const Icon = styled.img`
  margin-left: 10px;
  width: 20px;
  height: 20px;
`;
