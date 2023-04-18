import React from "react";
import { useDispatch } from "react-redux";
import { addIncidentDetails } from "../store/actions/incidentactions";
import './NewIncidents.scss'


function NewIncident() {
  const dispatch = useDispatch();

  const fields = [
    {
      label: "Title",
      type: "text",
      placeholder: "Enter Title",
      name: "title",
    },
    {
      label: "Description",
      type: "textArea",
      placeholder: "Enter Description",
      name: "description",
    },
    /*{
      label: "Status",
      type: "text",
      //placeholder: "Enter Mobile",
      name: "status",
    },
    {
      label: "priority",
      type: "string",
      //placeholder: "Enter Email",
      name: "priority",
    },
    {
      label: "Type of Incident",
      type: "string",
      name: "type",
    },*/
  ];
  
 

  // const responderObject = responders.find((responder) => {
  //   return responder.id.toString() === ticketData.responder_id.toString();
  // });

  const handleIncident = (event) => {
    event.preventDefault();
    const data = {};
    fields.forEach((field) => {
      data[field.name] = event.target[field.name].value;
    });
    data.status = event.target.status.value;
    data.priority = event.target.priority.value;
    data.type = event.target.type.value;
    //data.requester_id = event.target.requester.value;
    console.log(data);
    dispatch(addIncidentDetails(
      data.title,
      data.description,
      data.status,
      data.priority,
      data.type,
      data.requester_id
    ));
    
  };

  return (
    <form onSubmit={handleIncident} className="incidentform">
      <div>
          <h1>Incident</h1>
        </div>
      {fields.map((field) => {
        return (
          <div key={field.name}>
            <label >{field.label}</label>
            <input type={field.type} name={field.name} placeholder={field.placeholder} />
          </div>
        );
      })}
      <div>
        <label>Status:</label>
        <select name="status">
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div>
        <label>Priority:</label>
        <select name="priority">
          <option value="Low">Low</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
      <div>
        <label>Type:</label>
        <select name="type">
          <option value="software">software</option>
          <option value="hardware">hardware</option>
        </select>
      </div>
      <div>
        <button type="submit" variant="contained">
          Create
        </button>
      </div>
    </form>
  );
}

export default NewIncident;
