export const Language = {
  AZ: 'az',
  EN: 'en',
  RU: 'ru',
} as const;

export type Language = (typeof Language)[keyof typeof Language];
