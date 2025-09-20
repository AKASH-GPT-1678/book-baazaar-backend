import { Injectable } from '@nestjs/common';
import { PrismaServices } from './prisma.service';
import { Prisma , User } from '@prisma/client';
@Injectable()
export class AppService {

  constructor(
    private prisma : PrismaServices
  ){
    
  }
 
}
