import { UserTypeOrmModel } from '@database/typeorm/models';
import { getRepositoryToken } from '@nestjs/typeorm';

export const CUSTOM_PROVIDER_TOKENS = {
  REPOSITORIES: {
    USER_REPOSITORY: Symbol.for('USER_REPOSITORY'),
  },
  SERVICES: {
    CREATE_USER_USE_CASE: Symbol.for('CREATE_USER_USE_CASE'),
  },
  CACHE_MANAGER: Symbol.for('CACHE_MANAGER'),
};

export const TYPEORM_MODELS_REPOSITORY_TOKENS = {
  USER_REPOSITORY: getRepositoryToken(UserTypeOrmModel),
};
