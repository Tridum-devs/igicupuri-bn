import { ConfigService } from '@nestjs/config';
import { Neo4jConfig } from './neo4j.config.interface';

export const createDatabaseConfig = (
  configService: ConfigService,
  customConfig?: Neo4jConfig,
): Neo4jConfig =>
  customConfig || {
    host: configService.get('DB_HOST'),
    password: configService.get('DB_PASSWORD'),
    port: configService.get('DB_PORT'),
    scheme: configService.get('DB_SCHEME'),
    username: configService.get('DB_USERNAME'),
  };

export class ConnectionError extends Error {
  public details: string;
  constructor(oldError: Error) {
    super();
    this.message = 'FAILED TO CONNECT TO NEO4J DATABASE';
    this.name = 'CONNECTIOIN ERROR';
    this.stack = oldError.stack;
    this.details = oldError.message;
  }
}
