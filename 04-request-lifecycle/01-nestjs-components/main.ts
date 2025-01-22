import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpErrorFilter } from "./filters/http-error.filter";
// import { LoggingMiddleware } from "./middlewares/logging.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpErrorFilter());
  // app.use(LoggingMiddleware); // если LoggingMiddleware это функция то можно так
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
