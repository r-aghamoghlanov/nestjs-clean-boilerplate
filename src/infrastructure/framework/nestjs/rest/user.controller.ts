import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserInput } from '../../../../user/application/dtos/create-user.dto';
import { UserController } from '../../../../user/adapters/controllers/user.controller';
import { UserResponse } from '../../../../user/application/dtos/user-response-dto';
import { ROUTES } from './routes';

@Controller(ROUTES.USER.MAIN)
export class NestJSUserController {
  constructor(private readonly userController: UserController) {}

  @Post()
  async createUser(@Body() dto: CreateUserInput): Promise<UserResponse> {
    return await this.userController.createUser(dto);
  }
}
