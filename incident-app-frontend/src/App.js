
//import logo from './logo.svg';
import './App.scss';
 import LoginForm from './components/auth/login';
 import SignupForm from './components/auth/signup';
 import forgotPasswordForm from './components/auth/forgotPasswordForm';
import NewIncident from './forms/NewIncident.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Incidents from './components/dashboard/dashboard';
import Dashboard from './components/dashboard/dashboard';
function App() {
  return (
<div>
    <BrowserRouter>
      
        <Routes>
        <Route exact path="/" Component={LoginForm} />
        <Route path="/signup" Component={SignupForm} />
        <Route path="/login" Component={LoginForm}/>
        <Route path='/forgotpassword' Component={forgotPasswordForm}/>
        <Route path='/newIncident' Component={NewIncident}/>
        <Route path='/dashboard' Component={Dashboard}/>

        </Routes>
    
    </BrowserRouter>
  </div>
  );

}

export default App;
