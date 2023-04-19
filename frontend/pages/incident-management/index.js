/**
 * File Name: Incident-management.index.js
 * 
 * 
 * About: 
 * This file acts as the export for the Incident Management component in the app
 * 
 * Here we have wrapped it around the Layout component that handles the
 * transition animation across pages
 */

import IncidentManagement from '../../components/incidentManagement/IncidentManagement';
import Layout from '../../components/layout/layout'

const AnimatedIncidentManagement = () => {
    return <Layout >
        <IncidentManagement />
    </Layout>
}

export default AnimatedIncidentManagement;