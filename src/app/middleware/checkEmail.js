function isExistEmail(email) {
    return new Promise((resolve, reject) => {
        User.findOne({ email }, (err, user) => {
            if (err) reject(err);
            if (user) reject(new Error("Email already exists"));
            resolve(true);
        });
    });
}

export default { isExistEmail };
