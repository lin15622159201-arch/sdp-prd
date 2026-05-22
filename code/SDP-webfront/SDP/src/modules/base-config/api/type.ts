export interface IOperationLog {
  buzId: string | number | undefined;
  buzType: string | undefined;
  pageNum?: number;
  pageSize?: number;
}

interface ValidateError {
  message: string;
  field: string;
}

type FieldErrorList = Record<string, ValidateError[]>;

export interface Callback {
  (isValid?: boolean | Error, invalidFields?: FieldErrorList): void;
}
