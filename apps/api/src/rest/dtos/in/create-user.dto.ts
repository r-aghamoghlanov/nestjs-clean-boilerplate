import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { errorMessageKeys } from '@backend/core/common/errors/error-messages.constant';

const CreateUserSchema = z.object({
  email: z
    .string()
    .email(errorMessageKeys['user:alreadyExists'])
    .describe('User email'),
  name: z
    .string()
    .min(6, errorMessageKeys['validation:invalidName'])
    .describe('User name'),
  password: z
    .string()
    .min(8, errorMessageKeys['validation:invalidPassword'])
    .describe('User password'),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
