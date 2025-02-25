import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import styled from "styled-components";
import TagInput from "../components/Input/TagInput";
import useToastStore from "../store/useToastStore";
import useUploadStore from "../store/useUploadStore";

const UploadRelay = () => {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  const { title, intro, tags, setTitle, setIntro, setTags } = useUploadStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const userImage = sessionStorage.getItem("userImage");
  const userName = sessionStorage.getItem("userName");

  // 뒤로가기 시 상태 초기화
  useEffect(() => {
    if (!userImage || !userName) {
      navigate("/guest-login", {
        state: {
          fromNewRelay: true,
        },
        replace: true,
      });
    }
  }, [userImage, userName, navigate, setTitle, setIntro, setTags]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value.slice(0, 40)); // 제목 최대 40자
  };

  const handleIntroChange = (e) => {
    setIntro(e.target.value);
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const handleNext = () => {
    if (isSubmitting) return;

    setIsSubmitting(true); // 버튼 클릭 시, 제출 중 상태로 변경
    setTimeout(() => {
      setIsSubmitting(false); // 1.5초 후 해제
    }, 1500);

    if (!title.trim()) {
      addToast("제목을 입력해주세요.");
      return;
    }

    if (tags.length === 0) {
      addToast("태그를 한 개 이상 입력해주세요.");
      return;
    }

    // 다음 페이지로 이동
    navigate("/upload/tickle", {
      state: { fromNewRelay: true, fromUpload: true },
    });
  };

  return (
    <Container>
      <Header
        title={"릴레이 만들기"}
        buttonText="다음"
        onBtnClick={handleNext}
        disabled={isSubmitting} // 버튼 비활성화 상태 전달
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
  font-family: Pretendard;
  border: none;
  outline: none;
  resize: none;
  min-height: 100px;
`;

export default UploadRelay;
