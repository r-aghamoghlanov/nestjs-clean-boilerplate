import type { Language } from '@common/language.constant';
import type { IErrorMessages, ErrorMessageCode } from './error-message.type';

import { errorMessagesConstants } from './error-messages.constant';

export class MessageCodeError extends Error {
  public messageCode: ErrorMessageCode;

  public statusCode: number;

  public internalErrorMessage: string;

  public userErrorMessage: string;

  public errorBody?: string;

  public errorData?: Record<string, unknown>;

  public statusText: string;

  constructor(
    messageCode: ErrorMessageCode,
    errorData?: Record<string, unknown>,
    errorBody?: string,
  ) {
    super();
    // Static method installs stack trace information on a provided object as the `stack` property.
    // This will also hide internal information about the `MessageCodeError` class in the logs.
    Error.captureStackTrace(this, this.constructor);

    const errorMessageConfig = this.getErrorMessageConfig(messageCode);

    this.statusCode = errorMessageConfig.statusCode;
    this.statusText = errorMessageConfig.statusText;
    this.messageCode = messageCode;
    this.internalErrorMessage = errorMessageConfig.errorMessage;
    // On first instantiation, we use english as default language
    // Based on the user's language, we'll select the appropriate language using `localize` method
    this.userErrorMessage = errorMessageConfig.userMessage.en;
    this.errorBody = errorBody;
    this.errorData = errorData;
  }

  /**
   * @description: Find the error config by the given message code.
   * @param {ErrorMessageCode} messageCode
   * @return {IErrorMessages}
   */
  private getErrorMessageConfig(messageCode: ErrorMessageCode): IErrorMessages {
    return errorMessagesConstants[messageCode];
  }

  public static localize(exception: MessageCodeError, language: Language) {
    const userMessage =
      errorMessagesConstants[exception.messageCode].userMessage[language];

    if (exception.errorBody) {
      return userMessage.replace('{{errorBody}}', exception.errorBody);
    }

    return userMessage;
  }
}
