function mutipleMongooseToObject(mongooses) {
    return mongooses.map((mongooses) => mongooses.toObject());
}

function mongooseToObject(mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
}

export { mutipleMongooseToObject, mongooseToObject };
