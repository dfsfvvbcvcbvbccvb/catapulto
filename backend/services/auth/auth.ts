import { formRegisterUser } from "../../types/forms"
import { formLogin } from "../../types/forms";
import { findUserByEmail } from "../../repositories/auth/auth"
import bcrypt from 'bcrypt'
import { createUser } from "../../repositories/auth/auth";
import { getHashByEmail } from "../../repositories/auth/auth";
import { RowDataPacket } from "mysql2";

const saltRounds = 10;

async function hashPassword(password: string) {
    let hash = await bcrypt.hash(password, saltRounds)
    return hash
}

async function verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
}

export async function registration(formdata: formRegisterUser) {
    if (!formdata || !formdata.password || !formdata.email) {
        return 'Ошибка!'
    }

    const result = await findUserByEmail(formdata.email)

    if (result.length > 0) {
        return 'Пользователь с такой почтой уже существует!'
    }

    const hash = await hashPassword(formdata.password)
    const createResult = await createUser(formdata.email, hash)

    if (createResult === 'Успешно!') {
        return createResult
    }
}

export async function login(formdata: formLogin) {
    if (!formdata || !formdata.password || !formdata.email) {
        return 'Ошибка!'
    }

    const user = await findUserByEmail(formdata.email)
    const incorrectEmailOrPassword = 'Неверный логин или пароль!'

    if (user.length === 0) {
        return incorrectEmailOrPassword
    }

    let hash = await getHashByEmail(formdata.email)
    let result = await verifyPassword(formdata.password, hash)

    if (!result) {
        return incorrectEmailOrPassword
    }
    if (result) {
        return 'Успешно!'
    }
}