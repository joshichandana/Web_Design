/**
 * New Ticket Form page
 * 
 *
 * @module pages/incident-management/new
 * @requires components/form
 * @requires react-redux
 * @requires components/layout/layout
 */

import FormData from '../../components/form';
import { useSelector } from 'react-redux';
import Layout from '../../components/layout/layout';

export default function NewTicketForm() {
  const [dropDownData, loggedInAgent] =
    useSelector((state) => [state.ticketManagement.dropDownValues, state.app.userDetails]);

  return (
    <Layout >
      <FormData ticketResources={dropDownData} loggedInAgent={loggedInAgent}/>
    </Layout>

  );
}