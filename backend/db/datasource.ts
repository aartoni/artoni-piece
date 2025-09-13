import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'node:fs';

const configService = new ConfigService();

function readVarFromFile(varName: string) {
  const filePath = configService.getOrThrow<string>(varName);
  if (!filePath) {
    throw new Error(`${varName} env var is not set`);
  }
  return readFileSync(filePath, 'utf8').trim();
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  database: 'piece',
  username: 'postgres',
  password: readVarFromFile('DB_PASSWORD_FILE'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  extra: {
    connectionLimit: 10,
  },
};

console.log('Password:', readVarFromFile('DB_PASSWORD_FILE'));

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
