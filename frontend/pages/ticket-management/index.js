/**
 * File Name: ticket-management.index.js
 * 
 * 
 * About: 
 * This file acts as the export for the Ticket Management component in the app
 * 
 * Here we have wrapped it around the Layout component that handles the
 * transition animation across pages
 */

import TicketManagement from '../../components/ticketManagement/TicketManagement';
import Layout from '../../components/layout/layout'

const AnimatedTicketManagement = () => {
    return <Layout >
        <TicketManagement />
    </Layout>
}

export default AnimatedTicketManagement;