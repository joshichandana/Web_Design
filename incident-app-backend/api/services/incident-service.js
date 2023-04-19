import Incident from "../models/incident.js";


/**
 * Incident service
 * Author: Supriya Vallarapu
 * 
 * @module services/incident-service
 * @requires models/incident
 */


/**
 * Get all Incidents
 * @returns all the Incident resource in the 'Incidents' colection
 */
export const getAll = () => Incident.find({});

/**
 * Get a Incident by id
 * @param {*} id id of the Incident resource
 * @returns a Incident resource
 */
export const get = (id) => {
  return Incident.findById(id);
};

/**
 * Create a Incident
 * @param {*} Incident a Incident resource to be created
 * @returns a Incident resource
 */
export const save = (incident) => {
  return new Incident(incident).save();
};

/**
 * Update a Incident
 * @param {*} id id of the Incident  resource to be updated
 * @param {*} Incident the Incident content to be updated
 * @param {*} opts options that configures mongoose update method
 * @returns the updated Incident resource
 */
export const update = (id, incident, opts) => {
  return Incident.findByIdAndUpdate(id, incident, opts);
};

/**
 * Delete a Incident
 * @param {*} id id of the Incident resource to be deleted
 * @returns the Incident resource that was deleted
 */
export const remove = (id) => {
  return Incident.findByIdAndDelete(id);
};





    
