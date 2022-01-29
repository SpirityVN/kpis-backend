import { IsBoolean, IsIn, IsNumber, IsString } from 'class-validator';

type NODE_ENV = 'development' | 'production' | 'test';
type TYPEORM_TYPE = 'auto' | 'sqlite' | 'postgres' | 'mysql';

export class EnvConfig {
  @IsIn(['development', 'production', 'test'])
  NODE_ENV: NODE_ENV;

  @IsString()
  HOST: string;

  @IsNumber()
  PORT: number;

  @IsIn(['auto', 'sqlite', 'postgres', 'mysql'])
  TYPEORM_TYPE: TYPEORM_TYPE;

  @IsString()
  TYPEORM_HOST: string;

  @IsString()
  TYPEORM_USERNAME: string;

  @IsString()
  TYPEORM_PASSWORD: string;

  @IsString()
  TYPEORM_DATABASE: string;

  @IsNumber()
  TYPEORM_PORT: number;

  @IsBoolean()
  TYPEORM_LOGGING: boolean;

  @IsNumber()
  HEALTH_CHECK_DATABASE_TIMEOUT_MS: number;

  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_EXPIRES_IN: number;

  @IsBoolean()
  SKIP_AUTH: boolean;

  @IsBoolean()
  SWAGGER_UI: boolean;

  static getDefaultObject(): EnvConfig {
    const obj = new EnvConfig();
    obj.HOST = 'http://localhost:8080';
    obj.NODE_ENV = 'development';
    obj.PORT = 3001;
    obj.TYPEORM_TYPE = 'auto';
    obj.TYPEORM_HOST = 'localhost';
    obj.TYPEORM_USERNAME = 'user';
    obj.TYPEORM_PASSWORD = 'password';
    obj.TYPEORM_DATABASE = 'kpis';
    obj.TYPEORM_PORT = 3306;
    obj.TYPEORM_LOGGING = true;
    obj.HEALTH_CHECK_DATABASE_TIMEOUT_MS = 3000;
    obj.JWT_SECRET = '';
    obj.JWT_EXPIRES_IN = 86400;
    obj.SKIP_AUTH = false;
    obj.SWAGGER_UI = true;
    return obj;
  }
}
