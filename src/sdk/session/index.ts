import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { handleAxiosError, validateInput } from "../../utils/errors";
import type { CreateSession, SessionResource } from "./schema";
import { CreateSessionSchema, SessionResourceSchema } from "./schema";

export const createSession = async (
  params: CreateSession,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<SessionResource> => {
  try {
    const validatedParams = validateInput(
      CreateSessionSchema,
      params,
      "session params"
    );
    const response = await axiosInstance.post<SessionResource>(
      config?.url ?? "/sessions",
      validatedParams,
      {
        ...config,
        headers: {
          ...config?.headers,
        },
      }
    );
    return validateInput(
      SessionResourceSchema,
      response.data,
      "session response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};
