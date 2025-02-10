export const goToPreviousTickle = (allRelay, tickleId, relayId, navigate) => {
  const currentIndex = allRelay.findIndex((item) => item.tickleId === tickleId);
  if (currentIndex > 0) {
    const previousTickleId = allRelay[currentIndex - 1].tickleId;
    navigate(`/relay/${relayId}/tickle/${previousTickleId}`, { replace: true });
  }
};

export const goToNextTickle = (allRelay, tickleId, relayId, navigate) => {
  const currentIndex = allRelay.findIndex((item) => item.tickleId === tickleId);
  if (currentIndex < allRelay.length - 1) {
    const nextTickleId = allRelay[currentIndex + 1].tickleId;
    navigate(`/relay/${relayId}/tickle/${nextTickleId}`, { replace: true });
  }
};
