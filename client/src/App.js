
import {BrowserRouter,Switch,Route,Link} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components :
import TopNav from "./components/TopNav/TopNav"
import Home from "./components/booking/Home"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Dashboard from "./components/User/Dashbord"
import DashboardSelle from "./components/User/DashboardSeller"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import DashboardSeller from "./components/User/DashboardSeller";
import NewHotel from "./components/Hotels/NewHotel"
import StripeCallback from "./components/stripe/StripeCallback"
import EditHotel from './components/Hotels/EditHotel'
import ViewHotel from './components/Hotels/ViewHotel'


function App() {

  return (
    <BrowserRouter>
    <TopNav/>
    <ToastContainer position="top-center"/>
    <Switch>
     <Route exact path="/" component={Home}/>
     <Route exact path="/login" component={Login}/>
     <Route exact path="/Register" component={Register}/>
     <PrivateRoute exact path="/Dashboard" component={Dashboard}/>
     <PrivateRoute exact path="/Dashboard/Seller" component={DashboardSeller}/>
     <PrivateRoute exact path="/hotels/new" component={NewHotel}/>
     <PrivateRoute exact path="/stripe/callback" component={StripeCallback}/>
     <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel}/>
     <Route exact path="/hotel/:hotelId" component={ViewHotel}/>
     </Switch>
    </BrowserRouter>
  );
}

export default App;
