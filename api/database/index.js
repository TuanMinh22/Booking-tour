import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "ml-intern",
    password: "password",
    database: "booking",
    connectionLimit: 10,
    connectTimeout: 1000,
    waitForConnections: true,
    queueLimit: 0,
    insecureAuth: true
})