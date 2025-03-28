import { Module } from '@nestjs/common';
import {AppController} from "./app.controller";
import {KafkaModule} from "@app/kafka";

@Module({
  imports: [
      KafkaModule.register('product-analyzer'),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
