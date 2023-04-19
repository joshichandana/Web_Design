

/**
 * Incident controller
 * Author: Supriya Vallarapu
 * 
 *
 * @module controllers/Incident-controller
 * @requires services/Incident-service
 * @requires constants
 * @requires express
 */

import * as incidentService from "./../services/incident-service.js";

import constants from "../../constants.js";

const statusCodes = constants.statusCodes;

/**
 *
 * @param {*} obj the body to be sent back as response
 * @param {*} response the response object
 * @param {*} code  the status code to be sent back
 */
const setResponse = (obj, response, code = statusCodes.OK) => {
  response.status(code);
  response.json(obj);
};

/**
 *
 * @param {*} err error to be sent back
 * @param {*} response the response object
 * @param {*} code the status code to be sent back
 */
const setError = (err, response, code = statusCodes.INTERNAL_SERVER_ERROR) => {
  const message = err || 'Something went wrong';

  response.status(code);
  response.json(message);
};

/**
 * Get all incidents
 * @param {*} req request object
 * @param {*} res response object
 */
export const getAll = async (req, res) => {
  try {
    const incidents = await incidentService.getAll();

    setResponse({
      message: 'incidents retrieved successfully',
      data: incidents
    }, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Get a incident by id
 * @param {*} req request object
 * @param {*} res response object
 */
export const get = async (req, res) => {
  try {
    const incident = await incidentService.get(req.params.id);

    if (!incident) {
      return setError({ error: 'incident not found' }, res, statusCodes.NOT_FOUND);
    }

    setResponse({
      message: 'incident retrieved successfully',
      data: incident
    }, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Create a incident
 * @param {*} req request object
 * @param {*} res response object
 */
export const post = async (req, res) => {
  try {
    if (!req.body) {
      return setError({ error: 'Content cannot be empty' }, res, statusCodes.BAD_REQUEST);
    }

    if (!req.body.subject) {
      return setError({ error: 'Subject cannot be empty' }, res, statusCodes.BAD_REQUEST);
    }

    if (!req.body.description) {
      return setError({ error: 'Description cannot be empty' }, res, statusCodes.BAD_REQUEST);
    }

    const incident =req.body;
    const savedincident = await incidentService.save(incident);

    setResponse({
      message: 'incident saved successfully',
      data: savedincident
    }, res, statusCodes.CREATED);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Update a incident
 * @param {*} req request object
 * @param {*} res response object
 */
export const put = async (req, res) => {
  try {
    const incident = req.body;
    const updatedincident = await incidentService.update(req.params.id, incident, { new: true });

    if (!updatedincident) {
      return setError({ error: 'incident not found' }, res, statusCodes.NOT_FOUND);
    }

    setResponse({
      message: 'incident updated successfully',
      data: updatedincident
    }, res, statusCodes.OK);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Delete a incident
 * @param {*} req request object
 * @param {*} res response object
 */
export const remove = async (req, res) => {
  try {
    const incident = await incidentService.remove(req.params.id);

    setResponse({
      message: 'incident deleted successfully',
      data: incident
    }, res, statusCodes.OK);
  } catch (error) {
    setError(error, res);
  }
};