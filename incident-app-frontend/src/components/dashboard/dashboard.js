// install npm install react-bootstrap bootstrap if doesnt work

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    getIncidents();
  }, []);

  const getIncidents = async () => {
    try {
      const response = await fetch('http://localhost:8080/incidents');
      const resdata = await response.json();
      setIncidents(resdata.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Ticket System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Button as={Link} to="/NewIncident" variant="primary" className="ml-auto">New Incident</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h2 className="mt-4">Incident Dashboard</h2>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Type</th>
              <th>createdAt</th>
              <th>updatedAt</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.title}</td>
                <td>{incident.description}</td>
                <td>{incident.status}</td>
                <td>{incident.priority}</td>
                <td>{incident.type}</td>
                <td>{incident.createdAt}</td>
                <td>{incident.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Dashboard;


