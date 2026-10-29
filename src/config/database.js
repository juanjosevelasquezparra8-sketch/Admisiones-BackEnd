import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'my_database',
    waitForConnections: true,  /* Nos permite esperar a que haya conexiones libres */
    connectionLimit: 10,/* Nos permite limitar la cantidad de conexiones */
    queueLimit: 0 /* Nos permite limitar la cantidad de solicitudes pendientes */
});

export default pool;