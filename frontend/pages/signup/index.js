/**
 * Signup Page.
 
 *
 * @module pages/login
 * @requires /components/layout/layout
 * @requires /components/auth/Signup
 */
import Signup from './../../components/auth/Signup';
import Layout from '../../components/layout/layout';

const AnimatedSignIn = () => {
    return <Layout >
        <Signup />
    </Layout>
}

export default AnimatedSignIn;