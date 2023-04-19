/**
 * Incident Schema
 * Author: Supriya Vallarapu
 *
 *
 * @module schema/Incident
 * @requires constants
 */

// marking 'tags' and 'responder_id' as not required.

import constants from "../../constants.js";

const incidentSchema = {
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: constants.status,
    default: "Open",
    required: true,
  },
  priority: {
    type: String,
    enum: constants.priority,
    default: "Low",
    required: true,
  },
  type: {
    type: String,
    default: "software",
    requuired: false,
  },
  requester_id: {
    type: String,
    required: true,
  },
  responder_id: {
    type: String,
    required: true,
  },
};

export default incidentSchema;
