import 'dotenv/config';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaMssql } from '@prisma/adapter-mssql';
import { PrismaClient } from '../generated/prisma/client.js';

const adapter = new PrismaMssql({
  server: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? 1433),
  database: process.env.DB_NAME ?? 'MoreaDB',
  user: process.env.DB_USER ?? 'sa',
  password: process.env.DB_PASSWORD ?? '',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
});

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}