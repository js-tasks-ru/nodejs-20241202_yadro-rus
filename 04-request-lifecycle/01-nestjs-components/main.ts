import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { LoggingMiddleware } from "./middlewares/logging.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(LoggingMiddleware); // если LoggingMiddleware это функция то можно так
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
