import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';  // Import the exception filter

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific options
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Apply the global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Start the application
  await app.listen(8000);
}
bootstrap();
