require('dotenv').config();

export default {
    client: (process.env as any).DB_CLIENT || 'mysql',
    connection: {
        host: (process.env as any).DB_HOST,
        port: (process.env as any).DB_PORT,
        user: (process.env as any).DB_USER_NAME,
        password: (process.env as any).DB_PASSWORD,
        database: (process.env as any).DB_NAME,
        charset: 'utf8'
    },
    migrations: {
        tableName: '../../database/migrations'
      },
    
    debug: true,
}