import axios from "axios";
import config from "./config";
import {
  StartVerificationRequest,
  StartVerificationResponse,
  VerificationJob,
  Verification,
  GetVerificationResponse,
  ApiError,
} from "./types";

export const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.API_KEY}`,
  },
});

export const startVerification = async (
  payload: StartVerificationRequest
): Promise<StartVerificationResponse> => {
  const { data } = await apiClient.post<VerificationJob | ApiError>(
    "/verifications",
    payload
  );

  if ("error" in data) {
    return data as ApiError;
  }
  return data as VerificationJob;
};

export const getVerification = async (
  verificationId: string
): Promise<GetVerificationResponse> => {
  try {
    const { data } = await apiClient.get<Verification | ApiError>(
      `/verifications/${verificationId}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};
