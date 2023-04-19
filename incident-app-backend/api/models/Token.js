import mongoose from "mongoose";
import tokenSchema from "../schema/token.js";

const schema = new mongoose.Schema(tokenSchema, {timestamps: true, versionKey: false})
schema.method('toJSON', function() {
    const {_id, ...object} = this.toObject();
    object.id = _id;
    return object;

});

const Token = mongoose.model('Token', schema);
export default Token;