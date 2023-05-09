import pbkdf2Password from "pbkdf2-password";

const hasher = pbkdf2Password();

export default async function (password) {
    const output = await new Promise((resolve, reject) => {
        hasher({ password: password }, (err, pass, salt, hash) => {
            resolve({ salt: salt, hash: hash });
        });
    });
    console.log(output);
    return output;
}
