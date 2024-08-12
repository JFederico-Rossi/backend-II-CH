import bcrypt from "bcrypt";

const SALT_ROUNDS = 10

export function hashPass ( password ){
    return bcrypt.hashSync( password, SALT_ROUNDS)
}

export function comparePass(password, hash) {
    return bcrypt.compareSync(password, hash)
}