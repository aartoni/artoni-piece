import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

function readVarFromFile(varName: string) {
  const filePath = process.env[varName];
  if (!filePath) {
    throw new Error(`${varName} env var is not set`);
  }
  return configService.getOrThrow<string>('DB_PASSWORD');
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

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
