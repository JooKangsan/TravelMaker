interface ErrorResponseData {
  message?: string;
  [key: string]: unknown;
}

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message); // Error 이름을 명시적으로 설정
  }
}

const ErrorMessages: { [key: string]: string } = {
  400: "잘못된 형식의 요청입니다. 입력값을 확인해주세요.",
  401: "로그인이 필요합니다. 올바른 인증 정보를 제공해주세요.",
  403: "권한이 없습니다. 접근이 거부되었습니다.",
  404: "요청한 데이터를 찾을 수 없습니다. 다시 시도해주세요.",
  409: "이미 존재하는 데이터가 있습니다. 다른 값을 사용해주세요.",
  500: "서버에서 응답을 받아오지 못했습니다. 잠시 후 다시 시도해주세요.",
  default: "예상치 못한 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의하세요.",
};

export const handleApiError = (error: unknown) => {
  // API 응답 에러인 경우
  if (error && typeof error === "object" && "status" in error) {
    const apiError = error as { status: number; data?: ErrorResponseData };

    // 서버에서 전달된 메시지가 있으면 그 메시지를 우선 사용
    const errorMessage =
      apiError.data?.message || ErrorMessages[apiError.status] || ErrorMessages.default;
    // APIError 인스턴스를 생성할 때 메시지만 전달
    throw new APIError(errorMessage, apiError.status);
  }

  // fetch 네트워크 에러인 경우
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    throw new APIError("서버에서 응답을 받아오지 못했습니다.", 500);
  }

  // 기타 예상치 못한 에러
  throw new APIError("서버와의 통신 중 오류가 발생했습니다.", 500);
};

export { APIError };
