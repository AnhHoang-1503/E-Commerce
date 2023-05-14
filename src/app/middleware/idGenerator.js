import { ObjectId } from "mongodb";

function idGenerator(req, res, next) {
    const id = new ObjectId();
    req.objectId = id;
    next();
}

export default idGenerator;
