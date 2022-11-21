type Result = Record<string, any> | Record<string, any>[];

export type Response = {
  success: boolean;
  result?: Result;
  name?: Error['name'];
  error?: Error['message'];
};

export const ResponseSuccess = (result: Result): Response => {
  return {
    success: true,
    result: result,
  };
};

export const ResponseError = (error: Error): Response => {
  return {
    success: false,
    name: error.name,
    error: error.message,
  };
};
