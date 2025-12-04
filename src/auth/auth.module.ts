import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: (configService.get<string>('JWT_EXPIRES_IN') || '1d') as any,
    },
  }),
}),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule, AuthService]
})
export class AuthModule {}
