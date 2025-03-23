import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '@prisma/client';
import { request, Request } from 'express';
import { Observable } from 'rxjs';
import { TypesKey } from 'src/decorators/role.decorators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
  let requiredRole = this.reflector.getAllAndOverride(TypesKey,[context.getHandler(),context.getClass()])
  if(this.reflector){
    return true
  }
  try {
    let {user}=context.switchToHttp().getRequest()
    return requiredRole.some((role:UserType)=>user.type(role))
  } catch (error) {
    throw new UnauthorizedException()
  }
  }
}
