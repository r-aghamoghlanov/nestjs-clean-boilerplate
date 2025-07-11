import { HttpStatus } from './error-statuses.constant';

import type { IErrorMessages } from './error-message.type';

export const errorMessagesConstants = {
  'request:forbidden': {
    statusText: HttpStatus.FORBIDDEN.description,
    statusCode: HttpStatus.FORBIDDEN.code,
    errorMessage: 'Access denied',
    userMessage: {
      en: 'Access denied',
      az: 'Giriş qadağandır',
      ru: 'Доступ запрещен',
    },
  },
  'request:invalidHeaders': {
    statusText: HttpStatus.BAD_REQUEST.description,
    statusCode: HttpStatus.BAD_REQUEST.code,
    errorMessage: 'Invalid Headers',
    userMessage: {
      en: 'Invalid Headers',
      az: 'Yanlış Başlıqlar',
      ru: 'Неверные заголовки',
    },
  },
  /** -----------------------VALIDATION ERRORS-----------------------*/
  'validation:error': {
    statusText: HttpStatus.BAD_REQUEST.description,
    statusCode: HttpStatus.BAD_REQUEST.code,
    errorMessage: 'Internal Validation error',
    userMessage: {
      en: 'Validation Error',
      az: 'Doğrulama xətası',
      ru: 'Ошибка проверки',
    },
  },
  'validation:errorInPhoneNumberFormatting': {
    statusText: HttpStatus.BAD_REQUEST.description,
    statusCode: HttpStatus.BAD_REQUEST.code,
    errorMessage: 'Error in phone number formatting.',
    userMessage: {
      en: 'Error while trying to format phone number',
      az: 'Telefon nömrəsi yanlışdı',
      ru: 'Ошибка при попытке форматирования номера телефона',
    },
  },
  'validation:invalidPhoneNumber': {
    statusText: HttpStatus.BAD_REQUEST.description,
    statusCode: HttpStatus.BAD_REQUEST.code,
    errorMessage: 'Invalid phone number',
    userMessage: {
      en: 'Invalid phone number',
      az: 'Yanlış telefon nömrəsi',
      ru: 'Неверный номер телефона',
    },
  },
  /** -----------------------USER ERRORS-----------------------*/
  'user:notFound': {
    statusText: HttpStatus.NOT_FOUND.description,
    statusCode: HttpStatus.NOT_FOUND.code,
    errorMessage: 'User not found',
    userMessage: {
      en: 'User not found',
      az: 'İstifadəçi tapılmadı',
      ru: 'Пользователь не найден',
    },
  },
  'user:alreadyExists': {
    statusText: HttpStatus.CONFLICT.description,
    statusCode: HttpStatus.CONFLICT.code,
    errorMessage: 'User already exists with this email',
    userMessage: {
      en: 'User already exists with this email',
      az: 'Bu email artıq mövcuddur',
      ru: 'Введённый email занят',
    },
  },
} as const satisfies Record<string, IErrorMessages>;
