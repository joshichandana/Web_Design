import mongoose from "mongoose";
import incidentSchema from "../schema/incident.js";

const schema = new mongoose.Schema(incidentSchema, {timestamps: true, versionKey: false})
schema.method('toJSON', function() {
    const {_id, ...object} = this.toObject();
    object.id = _id;
    return object;

});

const Incident = mongoose.model('Incident', schema);
export default Incident;