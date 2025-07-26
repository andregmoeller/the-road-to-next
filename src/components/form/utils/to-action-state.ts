import { z, ZodError } from "zod";

export type ActionState = {
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof ZodError) {
    return {
      message: "",
      payload: formData,
      fieldErrors: z.flattenError(error).fieldErrors,
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      payload: formData,
      fieldErrors: {},
    };
  }

  // if not an error instance but something else crashed return generic error message
  return {
    message: "An unknown error occurred",
    payload: formData,
    fieldErrors: {},
  };
};

export const toActionState = (message: string): ActionState => {
  return {
    message,
    fieldErrors: {},
  };
};
