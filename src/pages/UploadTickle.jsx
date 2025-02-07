import React, { useState } from "react";
import Header from "../components/layout/Header";
import styled from "styled-components";

// TagInput 컴포넌트
const TagInput = ({ value, onChange }) => {
  return (
    <TagContainer>
      <Input
        type="text"
        placeholder="#태그 입력 최대 3개"
        value={value}
        onChange={onChange}
      />
    </TagContainer>
  );
};

const Upload = () => {
  // 각 필드별 상태를 분리하여 관리
  const [title, setTitle] = useState(""); // 제목
  const [intro, setIntro] = useState(""); // 소개
  const [tags, setTags] = useState(""); // 태그

  // 포커스 상태 관리
  const [focusedTitle, setFocusedTitle] = useState(false);
  const [focusedIntro, setFocusedIntro] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value.slice(0, 100)); // 제목은 최대 100자
  };

  const handleIntroChange = (e) => {
    setIntro(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  return (
    <Container>
      <Header title={"사진 업로드"} buttonText="완료" />
      <FormContainer>
        <Input
          type="text"
          placeholder="제목 생성하기"
          value={title}
          onChange={handleTitleChange}
          onFocus={() => setFocusedTitle(true)}
          focused={focusedTitle}
          titleStyle
        />
        <TextArea
          placeholder="릴레이를 소개해보세요"
          value={intro}
          onChange={handleIntroChange}
          onFocus={() => setFocusedIntro(true)}
          focused={focusedIntro}
        />
        <TagInput value={tags} onChange={handleTagsChange} />
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
  resize: none; /* 크기 조절 안되게 */
  min-height: 100px; /* 최소 높이 */
  ${({ focused }) =>
    focused &&
    `
    min-height: 150px; /* 포커스 시 최소 높이를 늘려줌 */
  `}
`;

const TagContainer = styled.div`
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

export default Upload;
