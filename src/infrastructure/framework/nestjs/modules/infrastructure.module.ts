import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmEntity } from '../../../database/typeorm/entities/user.typeorm.entity';
import { UserTypeOrmRepository } from '../../../database/typeorm/repositories/user.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
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
