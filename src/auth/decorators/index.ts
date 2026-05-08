import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { Role } from 'generated/prisma/enums';

// Ambil seluruh user atau field tertentu dari req.user
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) return request.user?.[data];
    return request.user;
  },
);

// Decorator untuk set roles yang diperbolehkan
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);