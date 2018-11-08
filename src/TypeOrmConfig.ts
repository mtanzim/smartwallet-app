import { BaseConnectionOptions } from "../node_modules/typeorm/browser/connection/BaseConnectionOptions"
import { DatabaseType } from "../node_modules/typeorm/browser/driver/types/DatabaseType"
import { LoggerOptions } from "../node_modules/typeorm/browser/logger/LoggerOptions"

// extend the prodivded types on the d.ts files for maintaing safety on type and logging options
export interface TypeOrmConfig extends BaseConnectionOptions{
  type: DatabaseType,
  database: string,
  location: string,
  logging: LoggerOptions,
  synchronize: boolean,
  // individual typing needs to be created for entity array elements before typing entity
  entities: any[],
}