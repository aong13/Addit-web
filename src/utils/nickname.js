const front = [
  "행복한",
  "귀여운",
  "빈털털이",
  "재빠른",
  "명쾌한",
  "수속성",
  "백수",
  "사차원",
  "뻣뻣한",
];
const animals = [
  "강아지",
  "고양이",
  "코알라",
  "오리",
  "호랑이",
  "곰",
  "토끼",
  "헴스터",
];

export const generateRandomName = () => {
  const adj = front[Math.floor(Math.random() * front.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return `${adj} ${animal}`;
};
