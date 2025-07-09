import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email('Invalid email address').describe('User email'),
  name: z
    .string()
    .min(1, 'Name must be at least 1 character long')
    .describe('User name'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .describe('User password'),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
