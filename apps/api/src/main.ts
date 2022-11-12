import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.API_PORT || 8081);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
