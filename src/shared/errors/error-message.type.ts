import { errorMessagesConstants } from './error-messages.constant';
import { HttpStatus } from './error-statuses.constant';

export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];

export type ErrorLanguage = 'az' | 'en' | 'ru';

export type UserErrorMessage = {
  [key in ErrorLanguage]: string;
};

export interface IErrorMessages {
  statusText: string;
  statusCode: number;
  errorMessage: string;
  userMessage: UserErrorMessage;
}

export type ErrorMessageCode = keyof typeof errorMessagesConstants;
