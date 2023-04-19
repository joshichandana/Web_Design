/**
 * Form component for the Incident creation page.
 
 *
 * @module components/form
 * @requires react
 * @requires react-redux
 * @requires @material-ui/core
 * @requires @mui/material
 * @requires next
 * @requires next/router
 * @requires components/text-field
 * @requires components/autocomplete-field
 * @requires store/slice/appSlice
 */

import { Container, Divider, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

// import { makeStyles}  from '@mui/styles'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HailTextField from './text-field.js';
import NinjaField from './autocomplete-field.js';
import { setCurrentView } from '../../store/slice/appSlice.js';



/*
 * props should contain:
  * Array of customers/Incident requesters
  * Array of agents/Incident responders
  * The current logged in agent to populate it as a default value for the responder id.
  * Array of tags
*/
export default function FormData(props) {
  const {
    agent: responders,
    customer: requesters
  } = props.IncidentResources;

  const loggedInResponder = props.loggedInAgent;

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(setCurrentView("New Incident"));
  }, []);

  // for now, using dummy data
  // const requesters = [
  //   { id: 1, name: 'Amira Halima' },
  //   { id: 2, name: 'Tyrik Lisa' },
  //   { id: 3, name: 'Nazzareno Edna' }
  // ];

  // const responders = [
  //   { id: 1, name: 'Eirenaios Aina' },
  //   { id: 2, name: 'Kizzy Walahfrid' },
  //   { id: 3, name: 'Secundinus Spurius' }
  // ];

  // const loggedInResponder = { id: 3, name: 'Secundinus Spurius' };

  const tags = ['tag1', 'tag2', 'tag3'];

  const [ IncidentData, setIncidentData ] = useState({
    subject: '',
    description: '',
    status: 'Open',
    priority: 'Low',
    requester_id: '',
    responder_id: loggedInResponder.id,
    tags: [],
  });
  console.log("hello",IncidentData)
  const requesterObject = requesters.find((requester) => {
    return requester.id.toString() === IncidentData.requester_id.toString();
  });

  const responderObject = responders.find((responder) => {
    return responder.id.toString() === IncidentData.responder_id.toString();
  });

  // const classes = useStyles();
  const Router = useRouter();

  const handleChange = (event) => {
    setIncidentData({
      ...IncidentData,
      [event.target.name]: event.target.value
    });
  };

  const saveIncident = (IncidentData) => {
    return fetch('http://localhost:8080/incidents/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(IncidentData)
    });
  };

  const handleSubmit = async (event) => {
    try {
      // TODO: display Incident created successful notification using notification service
      event.preventDefault();
      await saveIncident(IncidentData);
      Router.push('/incident-management');
    } catch (error) {
      // TODO: display error message using notification service
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="md" >
    {/* <Container component="main" maxWidth="md" className={classes.root}> */}

      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Create New Incident
      </Typography>

      <Typography variant="body2" component="p" gutterBottom>
        Fields marked with * are mandatory.
      </Typography>

      <Divider />
      {/* <Divider className={classes.vSpace} /> */}
      <Typography variant="h5" component="h3" gutterBottom>
        Incident Details
      </Typography>

      <form onSubmit={handleSubmit}>
        <HailTextField
          label="Title"
          name="subject"
          value={IncidentData.subject}
          onChange={handleChange}
        />

        <HailTextField
          label="Description"
          name="description"
          value={IncidentData.description}
          onChange={handleChange}
          multiline
          rows={4}
        />

        <NinjaField
          options={['Open', 'In Progress', 'Resolved', 'Closed'] || []}
          value={IncidentData.status}
          onChange={(event, newValue) => {
            handleChange({
              target: { name: 'status', value: newValue }
            });
          }}
          renderInput={(params) => (
            <HailTextField label="Status" name="status" {...params} />
          )}
        />

        <NinjaField
          options={['Low', 'Medium', 'High', 'Urgent'] || []}
          value={IncidentData.priority}
          onChange={(event, newValue) => {
            handleChange({
              target: { name: 'priority', value: newValue }
            });
          }}
          renderInput={(params) => (
            <HailTextField label="Priority" name="priority" {...params} />
          )}
        />

        <NinjaField
          options={requesters || []}
          getOptionLabel={(option) => {
            return (typeof option == 'string')
              ? option
              : option.name;
          }}
          isOptionEqualToValue={(option, value) => option.name.toString() === value.toString()}
          value={requesterObject ? requesterObject.name : ''}
          onChange={(event, newValue) => {
            handleChange({
              target: { name: 'requester_id', value: newValue?.id || '' }
            });
          }}
          renderInput={(params) => (
            <HailTextField label="Requesters" name="requester" {...params} />
          )}
        />

        <NinjaField
          options={responders || []}
          getOptionLabel={(option) => {
            return (typeof option == 'string')
              ? option
              : option.name;
          }}
          isOptionEqualToValue={(option, value) => option.name.toString() === value.toString()}
          value={responderObject ? responderObject.name : ''}
          onChange={(event, newValue) => {
            handleChange({
              target: { name: 'responder_id', value: newValue?.id || '' }
            });
          }}
          renderInput={(params) => (
            <HailTextField label="Responders" name="responder" {...params} />
          )}
        />

        <NinjaField
          multiple
          options={tags || []}
          value={IncidentData.tags}
          onChange={(event, newValue) => {
            handleChange({
              target: { name: 'tags', value: newValue }
            });
          }}
          renderInput={(params) => (
            <HailTextField
              label="Tags" name="tags" required={IncidentData.tags.length === 0} {...params} />
          )}
        />

        <Divider  />
        {/* <Divider className={classes.vSpace} /> */}

        <Box mt={3}>
        <div style={{display:'flex', width:"100%"}}>
          <Link  scroll={false} href="/incident-management">
            
            <Button variant="contained" type="button" sx={{mr: 89, backgroundColor: 'black', width: '15%'}}>
              Go Back
            </Button>
          </Link>
          <Button variant="contained" color="primary" type="submit" sx={{backgroundColor: 'black', width: '15%'}}>
            Submit
          </Button>
          </div>
        </Box>
      </form>
    </Container>
  )
};