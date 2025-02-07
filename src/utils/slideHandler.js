export const handleNext = (
  currentIndex,
  setCurrentIndex,
  setTranslateX,
  imagesLength
) => {
  if (currentIndex < imagesLength - 1) {
    setCurrentIndex((prev) => prev + 1);
    setTranslateX((prev) => prev - 100);
  } else {
    console.log("마지막");
  }
};

export const handlePrev = (currentIndex, setCurrentIndex, setTranslateX) => {
  if (currentIndex > 0) {
    setCurrentIndex((prev) => prev - 1);
    setTranslateX((prev) => prev + 100);
  } else {
    console.log("첫 번째");
  }
};
