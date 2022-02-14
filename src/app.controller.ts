import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/nft/mint')
  async mint(@Body('id') id: string): Promise<void> {
    return this.appService.mint(id);
  }

  @Post('/nft/buy')
  async buy(@Body('hash') hash: string, @Body('amount') amount): Promise<void> {
    return this.appService.buy(hash, amount);
  }
}
