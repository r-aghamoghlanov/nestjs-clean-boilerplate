const AUTH = {
  MAIN: '/auth',
  LOGIN: '/login',
  LOGOUT: '/logout',
  CHECK: '/check',
  RESET_PASSWORD: '/reset-password',
};

export const ROUTES = {
  ID: '/:id',
  MAIN_PATH: 'api',
  HEALTHCHECK: {
    MAIN: '/ping',
    REDIS: '/redis',
  },
  USER: {
    AUTH,
    MAIN: '/user',
    PUBLIC: {
      MAIN: '/public',
      SIGNUP: '/signup',
    },
  },
  WEBHOOKS: {
    MAIN: '/webhook',
  },
};
