import Incident from "../models/incident.js";


/**
 * Ticket service
 * Author: Supriya Vallarapu
 * 
 * @module services/incident-service
 * @requires models/incident
 */


/**
 * Get all tickets
 * @returns all the ticket resource in the 'tickets' colection
 */
export const getAll = () => Incident.find({});

/**
 * Get a ticket by id
 * @param {*} id id of the ticket resource
 * @returns a ticket resource
 */
export const get = (id) => {
  return Incident.findById(id);
};

/**
 * Create a ticket
 * @param {*} ticket a ticket resource to be created
 * @returns a ticket resource
 */
export const save = (incident) => {
  return new Incident(incident).save();
};

/**
 * Update a ticket
 * @param {*} id id of the ticket  resource to be updated
 * @param {*} ticket the ticket content to be updated
 * @param {*} opts options that configures mongoose update method
 * @returns the updated ticket resource
 */
export const update = (id, incident, opts) => {
  return Incident.findByIdAndUpdate(id, incident, opts);
};

/**
 * Delete a ticket
 * @param {*} id id of the ticket resource to be deleted
 * @returns the ticket resource that was deleted
 */
export const remove = (id) => {
  return Incident.findByIdAndDelete(id);
};





    
