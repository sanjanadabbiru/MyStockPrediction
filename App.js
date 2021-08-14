
import './App.css';
import UserDash from './Components/UserDash';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { AuthProvider } from "./Contexts/AuthContext"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import PrivateRoute from "./Components/PrivateRoute"
import ForgotPassword from "./Components/ForgotPassword"
import UpdateProfile from "./Components/UpdateProfile"
import EnterNewStock from "./Components/EnterNewStock"
import UserProfile from "./Components/UserProfile"
function App() {
  return (
    <Router>
    <div className="App">
      <AuthProvider>
      <Switch>
      <Route path="/" exact component={Home}/> 
      <PrivateRoute path="/update-profile" component={UpdateProfile} />
    <Route path="/userdash" component={UserDash}/>
    <Route path="/login" component={Login}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/newstock" component={EnterNewStock}/>
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/userprofile" component={UserProfile} />
      <Home></Home>
      </Switch>
      </AuthProvider>
    </div>
    </Router>
  );
}

export default App;
