import DashboardNav from "../DashboardNav/DashboardNav"
import ConnectNav from "../ConnectNav/ConnectNav"
import {Link} from "react-router-dom"
const Dashboard = () => {
    return (
      <>
        <div className="aym container-fluid p-4">
        <ConnectNav/>
        </div>

        <div className="container-fluid p-4">
          <DashboardNav/>
          </div>
  
        <div className="container-fluid">
          <div className="row">
              <div className="col-md-10">
               <h2>Your Bookings</h2>
              </div>
              <div className="col-md-2">
                  <Link to="/" className="btn btn-primary">Browse Hotels</Link>
              </div>
        </div>
        </div>
      </>
    );
  };
  
  export default Dashboard;