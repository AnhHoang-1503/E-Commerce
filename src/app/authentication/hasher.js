import pbkdf2Password from "pbkdf2-password";

const hasher = pbkdf2Password();

export default async function (password, salt = undefined) {
    const output = await new Promise((resolve, reject) => {
        hasher({ password, salt }, (err, pass, salt, hash) => {
            resolve({ salt: salt, hash: hash });
        });
    });
    return output;
}
