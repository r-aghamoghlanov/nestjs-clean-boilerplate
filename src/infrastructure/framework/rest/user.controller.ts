import { Controller, Post, Body } from '@nestjs/common';
import { UserController } from '@core/user/adapters/controllers/user.controller';
import { UserResponse } from '@core/user/application/dtos/out/user-response-dto';
import { ROUTES } from './routes';
import { CreateUserDto } from './dtos/in/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(ROUTES.USER.MAIN.replace('/', '').toUpperCase())
@Controller(ROUTES.USER.MAIN)
export class NestJSUserController {
  constructor(private readonly userController: UserController) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserResponse> {
    return await this.userController.createUser(dto);
  }
}
