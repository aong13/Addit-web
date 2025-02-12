import styled from "styled-components";

export const Button = ({
  text,
  icon,
  onClick,
  textColor,
  borderColor,
  bgColor,
  disabled,
}) => {
  return (
    <CustomBtn
      onClick={!disabled ? onClick : undefined}
      textColor={textColor}
      borderColor={borderColor}
      bgColor={bgColor}
      disabled={disabled}
    >
      {text}
      {icon && <Icon src={icon} />}
    </CustomBtn>
  );
};

const CustomBtn = styled.button`
  margin-top: 20px;
  display: flex;
  color: ${({ textColor, disabled }) =>
    disabled ? "#a0a0a0" : textColor || "#7fa3ff"};
  font-size: 14px;
  font-weight: 600;
  padding: 14px 40px;
  background-color: ${({ bgColor, disabled }) =>
    disabled ? "#E0E0E0" : bgColor || "transparent"};
  border: 1px solid
    ${({ borderColor, disabled }) =>
      disabled ? "#BDBDBD" : borderColor || "#7fa3ff"};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 140px;
  max-width: 240px;
  transition: 0.3s ease;
`;

const Icon = styled.img`
  margin-left: 10px;
  width: 20px;
  height: 20px;
`;
