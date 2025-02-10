import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import styled from "styled-components";
import TagInput from "../components/TagInput";

const UploadRelay = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [tags, setTags] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value.slice(0, 40)); // 제목 최대 40자
  };

  const handleIntroChange = (e) => {
    setIntro(e.target.value);
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags); // 태그 배열을 직접 업데이트
  };

  const handleNext = () => {
    navigate("/upload/tickle", {
      state: { title, tags, intro, fromNewRelay: true, fromUploadRelay: true },
    });
  };

  return (
    <Container>
      <Header
        title={"릴레이 만들기"}
        buttonText="다음"
        onBtnClick={handleNext}
      />
      <FormContainer>
        <Input
          type="text"
          placeholder="제목 생성하기"
          value={title}
          onChange={handleTitleChange}
          titleStyle
        />
        <TextArea
          placeholder="릴레이를 소개해보세요"
          value={intro}
          onChange={handleIntroChange}
        />
        <TagInput tags={tags} onChange={handleTagsChange} />
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

export default UploadRelay;
