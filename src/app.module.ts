import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionModule } from './region/region.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CommentsModule } from './comments/comments.module';
import { ViewModule } from './view/view.module';
import { OrderModule } from './order/order.module';
import { LikeModule } from './like/like.module';
import { AboutModule } from './about/about.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { NotificationGateway } from './notification/notification.gateway';

@Module({
  imports: [RegionModule, ColorModule, CategoryModule, UserModule, ProductModule, CommentsModule, ViewModule, OrderModule, LikeModule, AboutModule, SessionModule, AuthModule, PrismaModule, MailModule,JwtModule.register({global:true})],
  controllers: [AppController],
  providers: [AppService, NotificationGateway],
  exports:[JwtModule]
})
export class AppModule {}
