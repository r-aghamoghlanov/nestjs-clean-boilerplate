import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserInput } from '../../../../user/application/dto/create-user.dto';
import { UserController } from '../../../../user/adapters/controllers/user.controller';
import { UserResponse } from '../../../../user/application/dto/user-response-dto';

@Controller('users')
export class NestJSUserController {
  constructor(private readonly userController: UserController) {}

  @Post()
  async createUser(@Body() dto: CreateUserInput): Promise<UserResponse> {
    return await this.userController.createUser(dto);
  }
}
