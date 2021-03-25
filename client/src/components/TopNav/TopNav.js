import {Link} from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'




const TopNav=()=>{
const dispatch = useDispatch();
const {auth}=useSelector((state)=>({...state}))
const history=useHistory();

const logout=()=>{
dispatch({
  type:'LOGOUT',
  payload:null,
})
window.localStorage.removeItem('auth');
history.push('/login');
}


    return(
   <div class="nav bg-light d-flex justify-content-between">
    <Link class="nav-link" to="/">Home</Link>

    {auth!==null && (   
     <>
    <Link class="nav-link" to="/dashboard">Dashboard</Link>
    
    </>
    )}
  
    {auth!==null && (   
     <>
    <a class="nav-link pointer" onClick={logout}>Logout</a>
    
    </>
    )}
  
   {auth===null && (   
     <>
    <Link class="nav-link" to="/login">Login</Link>
    <Link class="nav-link" to="/register">Register</Link> 
    </>
    )}



    
   </div>
    )
  
  }

  export default TopNav ;