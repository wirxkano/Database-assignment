import sql from 'mssql'
import { env } from '~/config/env'

const sqlConfig = {
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  server: env.DB_HOST,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

let pool

export const connectToDB = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(sqlConfig)
    }
    return pool
  } catch (err) {
    console.error('Database connection failed.', err)
    throw err
  }
}

export const getConnection = () => {
  if (!pool) {
    throw new Error('Database connection has not been established.')
  }
  return pool
}

export { sql };
