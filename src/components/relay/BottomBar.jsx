import React from "react";
import styled from "styled-components";

const BottomBar = ({ relayData }) => {
  return (
    <BottomContainer>
      <IconContainer>
        <Text> 좋아요 </Text>
        <Text> {relayData?.like} </Text>
      </IconContainer>
      <Button>
        <ButtonText> + </ButtonText>
      </Button>
      <IconContainer>
        <Text> 댓글 </Text>
      </IconContainer>
    </BottomContainer>
  );
};

const BottomContainer = styled.div`
  padding: 30px 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  background-color: red;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: #ffffff80;
  padding: 16px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
`;

const ButtonText = styled.span`
  font-weight: 800;
`;

const Text = styled.span`
  font-size: 16px;
`;

export default BottomBar;
