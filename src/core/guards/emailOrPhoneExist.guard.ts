import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class EmailOrPhoneExist implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const { email, phone } = request.body;
    if (!email && !phone) {
      throw new ForbiddenException('Mail or phone required');
    }
    return true;
  }
}
