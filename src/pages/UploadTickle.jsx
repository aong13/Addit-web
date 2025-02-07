import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import styled from "styled-components";

const TagInput = ({ value }) => {
  return (
    <TagContainer>
      <Input
        type="text"
        placeholder="태그가 없습니다."
        value={value}
        readOnly
      />
    </TagContainer>
  );
};

const UploadTickle = () => {
  const location = useLocation();
  const { title, tags, intro } = location.state || {}; //이전에서 받아옴
  const [content, setContent] = useState("");

  //로그로 일단 확인
  const submit = () => {
    console.log("제목:", title);
    console.log("태그:", tags);
    console.log("소개:", content);
    console.log("내용:", intro);
  };

  return (
    <Container>
      <Header title={"사진 업로드"} buttonText="완료" onBtnClick={submit} />
      <FormContainer>
        <Input type="text" value={title} readOnly titleStyle />
        <TagInput value={tags} />
        <TextArea
          value={content}
          placeholder="비하인드 스토리 사진을 공유해보세요!"
          onChange={(e) => setContent(e.target.value)}
        />
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 80px;
`;

const Input = styled.input`
  margin: 0 20px;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  ${({ titleStyle }) =>
    titleStyle &&
    `
    font-weight: bold;
    color: black;
  `}
`;

const TextArea = styled.textarea`
  margin: 0 20px;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  resize: none;
  min-height: 100px;
`;

const TagContainer = styled.div`
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

export default UploadTickle;
