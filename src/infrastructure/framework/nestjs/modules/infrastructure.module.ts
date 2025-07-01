import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmModel } from '../../../database/typeorm/models/user.typeorm.model';
import { UserTypeOrmRepository } from '../../../database/typeorm/repositories/user.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmModel])],
  providers: [
    UserTypeOrmRepository,
    {
      provide: 'IUserRepository',
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: ['IUserRepository'],
})
export class InfrastructureModule {}
