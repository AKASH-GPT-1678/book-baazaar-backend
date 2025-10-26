import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { PrismaServices } from 'src/prisma.service';
import { UserG } from './entities/graph.user';
import { retry } from 'rxjs';
import { Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/jwt/jwt.guard';

@Resolver(() => UserG)
export class UserResolver {
    constructor(private readonly prisma: PrismaServices) { }
   
    @Query(() => UserG, { name: 'getUserData' })
    @UseGuards(JwtGuard)
    async getUserData(@Context() context): Promise<any> {
        const id = context.req.user.sub;  // ✅ Ac
        const user = await this.prisma.users.findUniqueOrThrow({
            where: { id },
            include: {
                listings: true,
                orders: true,
                favorites: true,
            },
        });

        return user;
    }
}
