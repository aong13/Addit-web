import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import styled from "styled-components";
import cameraIcon from "../assets/icons/camera.svg";
import deleteIcon from "../assets/icons/x_icon.svg";
import TagInput from "../components/TagInput";
import { addTickleData, postRelayData } from "../apis/relayApi";

const UploadTickle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, tags, intro, relayId } = location.state || {};
  const userImage = "https://storage.googleapis.com/addit-prod/user_bear.jpg"; //임시
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); //파일저장
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = async () => {
    const fromUploadRelay = location.state?.fromUploadRelay;

    try {
      if (fromUploadRelay) {
        const requestData = {
          title,
          tags,
          relayDescription: intro,
          tickleDescription: content,
          userImage,
          file: image,
          userName: "미연결",
        };

        const response = await postRelayData(requestData);
        console.log("릴레이 데이터 생성 성공:", response);

        navigate(
          `/relay/${response.data.relayId}/tickle/${response.data.tickleId}`,
          {
            replace: true,
            state: { fromUpload: true },
          }
        );
      } else {
        const tickleData = {
          relayId,
          tickleDescription: content,
          userImage,
          file: image,
          userName: "미연결",
        };

        const response = await addTickleData(tickleData);
        console.log("티클 추가 성공:", response);

        navigate(
          `/relay/${response.data.relayId}/tickle/${response.data.tickleId}`,
          {
            replace: true,
            state: { fromUpload: true },
          }
        );
      }
    } catch (error) {
      console.error("데이터 전송 실패:", error);
    }
  };

  return (
    <Container>
      <Header title="사진 업로드" buttonText="생성" onBtnClick={handleSubmit} />
      <FormContainer>
        <TitleInputWrapper>
          <Input type="text" value={title} readOnly titleStyle />
          <label htmlFor="fileUpload">
            <CameraBtn src={cameraIcon} alt="카메라 버튼" />
          </label>
          <HiddenFileInput
            ref={fileInputRef}
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </TitleInputWrapper>
        <TagInput tags={tags} editMode={false} />
        <ContentContainer>
          {image && (
            <ImageWrapper>
              <PreviewImage
                src={URL.createObjectURL(image)}
                alt="미리보기 이미지"
              />
              <RemoveButton
                src={deleteIcon}
                alt="delete"
                onClick={handleRemoveImage}
              />
            </ImageWrapper>
          )}
          <TextArea
            value={content}
            placeholder="비하인드 스토리 사진을 공유해보세요!"
            onChange={(e) => setContent(e.target.value)}
          />
        </ContentContainer>
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
  margin-left: 20px;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  flex: 1;
  ${({ titleStyle }) =>
    titleStyle &&
    `
    font-weight: bold;
    color: black;
  `}
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  resize: none;
  min-height: 100px;
`;

const TitleInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const CameraBtn = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  object-fit: cover;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ContentContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  margin: 10px;
  position: relative;
  display: inline-block;
  width: 30%;
  aspect-ratio: 9 / 16;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.img`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background: #ffffff80;
`;

export default UploadTickle;
