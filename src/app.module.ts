import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaServices } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SellerModule } from './seller/seller.module';
import { ProductModule } from './product/product.module';
import { SeedingModule } from './seeding/seeding.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    })


    , UserModule, AuthModule, SellerModule, ProductModule, SeedingModule],
  controllers: [AppController],
  providers: [AppService, PrismaServices],
  exports: [AppService]
})
export class AppModule { }
