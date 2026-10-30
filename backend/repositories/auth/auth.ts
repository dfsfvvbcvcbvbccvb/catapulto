import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2/promise';

async function getConnection() {
    return await mysql.createConnection({
           host: 'localhost',
           user: 'root',
           password: 'ez123',
           database: 'catapulto'
           })
}

export async function findUserByEmail(email: string) {
    let connection = await getConnection()

    let [rows] = await connection.execute<RowDataPacket[]>({
        sql: 'SELECT email FROM users WHERE email = ?',
        values: [email]
    }
    )

    await connection.end()
    return rows
}

export async function createUser(email: string, hash: string) {
    let connection = await getConnection()

    try {
        let [result] = await connection.execute(
            `INSERT INTO users (email, password) VALUES (?, ?)`,
            [email, hash]
        )
        return 'Успешно!'
    } catch (e) {
        console.error(e)
        return e
    }
}

export async function getHashByEmail(email: string) {
    let connection = await getConnection()

    let [rows, fields] = await connection.execute<RowDataPacket[]>(
        `SELECT password FROM users WHERE email = ?`,
        [email]
    )

    return rows[0].password
}