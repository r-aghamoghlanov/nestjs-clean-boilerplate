import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from '../../../config/config.service';
import { PROVIDER_TOKENS } from './provider-tokens';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [
    {
      useClass: ConfigService,
      provide: PROVIDER_TOKENS.SERVICES.CONFIG_PROVIDER,
    },
  ],
  exports: [PROVIDER_TOKENS.SERVICES.CONFIG_PROVIDER],
})
export class ConfigModule {}
