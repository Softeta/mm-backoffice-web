export type ErrorResponse = {
  response: {
    data?: {
      Code?: string;
      Errors?: string[];
      Parameters?: string[];
    };
    status?: number;
  };
};

export type TagsErrorResponse = {
  response: {
    data?: {
      code: string;
      message?: string;
    };
  };
};
