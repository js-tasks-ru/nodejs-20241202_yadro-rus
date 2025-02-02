import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { LoggingMiddleware } from "./middlewares/logging.middleware";

@Module({
  imports: [TasksModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggingMiddleware)
      // .exclude({ path: "tasks", method: RequestMethod.GET }, "tasks/{*splat}")
      .forRoutes({ path: "tasks", method: RequestMethod.ALL });
  }
}
