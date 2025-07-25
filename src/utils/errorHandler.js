export const parseErrorMessage = (error) => {
  const message = error.reason || error.message || "";

  if (message.includes("user rejected transaction")) {
    return "요청을 거부하셨습니다. 다시 시도해주세요.";
  }
  // 'exceed' 오타 수정
  if (message.includes("Amount must exceed current deposit")) {
    return "현재 킹의 입금액보다 더 많은 금액을 입금해야 합니다.";
  }
  if (message.includes("King time not over")) {
    return "아직 보상을 수령할 수 없습니다. 남은 시간을 확인해주세요.";
  }
  if (message.includes("insufficient funds")) {
    return "지갑의 잔액이 부족합니다.";
  }

  // 기본 에러 메시지 추가
  return "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
};
