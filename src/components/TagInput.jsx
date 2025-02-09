import React, { useState } from "react";
import styled from "styled-components";

const TagInput = ({ tags = [], onChange, editMode = true }) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (value) => {
    const trimmedValue = value.trim().replace(/^#/, ""); // # 제거
    if (
      trimmedValue.length > 0 && // 빈 값 제외
      tags.length < 3 && // 태그 최대 3개
      !tags.includes(trimmedValue) // 중복 태그 제외
    ) {
      onChange([...tags, trimmedValue]);
    }
    setInputValue(""); //초기화
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue) {
      onChange(tags.slice(0, -1)); // 마지막 태그 삭제
    }
  };

  const removeTag = (tag) => {
    onChange(tags.filter((t) => t !== tag));
  };
  return (
    <TagContainer>
      <TagInputWrapper>
        {tags.map((tag, index) => (
          <Tag key={index} onClick={() => removeTag(tag)}>
            <p>{`#${tag}`}</p>
            {editMode && <RemoveButton>x</RemoveButton>}
          </Tag>
        ))}
        {editMode && tags.length < 3 && (
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleKeyPress}
            placeholder="태그 입력 (최대 3개)"
          />
        )}
      </TagInputWrapper>
      {!editMode && tags.length === 0 && (
        <PlaceholderText>태그 없음</PlaceholderText>
      )}
    </TagContainer>
  );
};

const TagContainer = styled.div`
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 12px 20px;
`;

const TagInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  background-color: #e7edff;
  border-radius: 20px;
  font-size: 14px;
  color: #333;
  gap: 6px;
`;

const RemoveButton = styled.button`
  background: transparent;
  height: 100%;
  border: none;
  color: #000;
  font-size: 10px;
  cursor: pointer;
  padding: 0;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  font-size: 14px;
  flex-grow: 1;
  min-width: 80px;
`;

const PlaceholderText = styled.span`
  color: #aaa;
  font-size: 14px;
`;

export default TagInput;
