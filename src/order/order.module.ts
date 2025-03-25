import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Module({
  imports:[PrismaModule],
  controllers: [OrderController],
  providers: [OrderService,NotificationGateway],
})
export class OrderModule {}
