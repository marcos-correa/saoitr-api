import { Response } from 'express';
import { ErrorCode, MessageStatus } from 'src/interfaces/responses.interface';

export function responseError(res: Response, error: ErrorCode) {
  const { message, status } = error;
  res.status(status).json({ message });
}

export function responseMessage(
  res: Response,
  status: number,
  message: string,
) {
  res.status(status).json({ message });
}

export function responseData(res: Response, status: number, data: any) {
  res.status(status).json(data);
}

// Throw Error
export function newError(error: MessageStatus) {
  const { status, message } = error;
  return new ErrorCode(status, message);
}
