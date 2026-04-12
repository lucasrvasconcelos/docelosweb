import { type AxiosError, isAxiosError } from "axios";

export function axiosErrorFormat(error: AxiosError | Error | unknown): string {
  if (isAxiosError(error)) {
    return error.response?.data?.message || "Erro inesperado no servidor";
  }

  if (error instanceof Error) {
    return error.message || "Erro desconhecido";
  }

  return "Erro inesperado";
}
