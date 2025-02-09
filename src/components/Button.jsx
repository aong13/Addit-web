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
`;

const Icon = styled.img`
  margin-left: 10px;
  width: 20px;
  height: 20px;
`;
