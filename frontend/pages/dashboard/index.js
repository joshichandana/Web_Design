/**
 * File Name: pages/dashboard/index.js
 * About: 
 * This file acts as the export for the Dashboard component in the app
 * 
 * Here we have wrapped it around the Layout component that handles the
 * transition animation across pages
 */

import Dashboard from './../../components/dashboard/Dashboard';
import Layout from '../../components/layout/layout'

const AnimatedDash = () => {
    return <Layout >
        <Dashboard />
    </Layout>
}

export default AnimatedDash;