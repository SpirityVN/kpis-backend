import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from './config/config.service';
import * as helmet from 'helmet';
import { join } from 'path';
import { AllExceptionsFilter } from './exception/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  app.enableCors();
  app.use(helmet());
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useStaticAssets(join(__dirname, '..', 'public'));
  if (config.env.SWAGGER_UI) {
    const options = new DocumentBuilder().addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }
  await app.listen(config.env.PORT);
}
bootstrap();
