import { UserTypeOrmModel } from '@database/typeorm/models';
import { getRepositoryToken } from '@nestjs/typeorm';

export const CUSTOM_PROVIDER_TOKENS = {
  REPOSITORIES: {
    USER_REPOSITORY: Symbol.for('USER_REPOSITORY'),
  },
  SERVICES: {
    CREATE_USER_USE_CASE: Symbol.for('CREATE_USER_USE_CASE'),
  },
  CACHE_SERVICE: Symbol.for('CACHE_SERVICE'),
};

export const TYPEORM_MODELS_REPOSITORY_TOKENS = {
  USER_REPOSITORY: getRepositoryToken(UserTypeOrmModel),
};
