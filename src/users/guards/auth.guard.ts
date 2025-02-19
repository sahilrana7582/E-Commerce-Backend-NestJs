import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader: string = request.headers.authorization || '';
    const token: string = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : '';
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const decodedToken: JwtPayload = this.jwtService.verify(
        token,
      ) as JwtPayload;
      console.log(decodedToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid token', error);
    }

    return true;
  }
}
