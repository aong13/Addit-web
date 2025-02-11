import styled from "styled-components";

export const Button = ({
  text,
  icon,
  onClick,
  textColor,
  borderColor,
  bgColor,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      textColor={textColor}
      borderColor={borderColor}
      bgColor={bgColor}
    >
      {text}
      {icon && <Icon src={icon} />}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  margin-top: 20px;
  display: flex;
  color: ${({ textColor }) => textColor || "#7fa3ff"};
  font-size: 14px;
  font-weight: 600;
  padding: 14px 40px;
  background-color: ${({ bgColor }) => bgColor || "transparent"};

  border: 1px solid ${({ borderColor }) => borderColor || "#7fa3ff"};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 140px;
  max-width: 240px;
`;

const Icon = styled.img`
  margin-left: 10px;
  width: 20px;
  height: 20px;
`;
