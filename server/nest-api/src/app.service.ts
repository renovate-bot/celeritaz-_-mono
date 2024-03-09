import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTest(id: string) {
    if (!id) {
      throw new BadRequestException('id is required');
    }
    if (id.length < 5) {
      throw new BadRequestException('id is too short');
    }
    return 'This is an test response!';
  }
}
