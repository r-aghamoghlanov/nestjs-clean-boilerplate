import { errorMessagesConstants } from './error-messages.constant';
import { HttpStatus } from './error-statuses.constant';
import { Language } from '@shared/language.constant';

export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];

export type UserErrorMessage = {
  [key in Language]: string;
};

export interface IErrorMessages {
  statusText: string;
  statusCode: number;
  errorMessage: string;
  userMessage: UserErrorMessage;
}

export type ErrorMessageCode = keyof typeof errorMessagesConstants;
