/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable n/no-missing-import */
import { dbConfig } from "../config/db.config.js";
import { rxDataModel } from "./rxdata.model.js";

import { Sequelize, Op } from "sequelize";
import pg from 'pg';

const sequelize = new Sequelize(dbConfig.DB!, dbConfig.USER!, dbConfig.PASSWORD!, {
  dialectModule: pg,
  host: dbConfig.HOST!,
  port: dbConfig.port ? +dbConfig.port : 5432,
  dialect: 'postgres',

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

export const db = {
  Sequelize: Sequelize,
  Op: Op,
  sequelize: sequelize,
  rxData: rxDataModel(sequelize, Sequelize)
};
