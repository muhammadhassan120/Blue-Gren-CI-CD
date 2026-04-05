import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 🌐 Main landing page (premium UI)
  @Get()
  getHome(): string {
    return this.appService.getLandingPage();
  }

  // 🤖 AI: Generate summary
  @Post('ai/summary')
  async getSummary(): Promise<{ result: string }> {
    const result = await this.appService.generateAiInsight('summary');
    return { result };
  }

  // 🤖 AI: Generate optimization tips
  @Post('ai/tips')
  async getTips(): Promise<{ result: string }> {
    const result = await this.appService.generateAiInsight('tips');
    return { result };
  }
}