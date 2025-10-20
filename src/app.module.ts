import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaServices } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SellerModule } from './seller/seller.module';
import { ProductModule } from './product/product.module';
import { SeedingModule } from './seeding/seeding.module';

@Module({
  imports: [UserModule, AuthModule, SellerModule, ProductModule, SeedingModule],
  controllers: [AppController],
  providers: [AppService, PrismaServices],
  exports :[AppService]
})
export class AppModule {}
