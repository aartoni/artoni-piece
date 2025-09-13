import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';

function readVarFromFile(varName: string): string {
  const filePath = process.env[varName];
  if (!filePath) {
    throw new Error(`${varName} env var is not set`);
  }
  return readFileSync(filePath, 'utf8').trim();
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: readVarFromFile('DB_PASSWORD_FILE'),
      database: 'piece',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
