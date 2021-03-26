import LoginForm from '../LoginForm/LoginForm'
import { toast } from 'react-toastify';
import {useState} from 'react';
import {login} from '../../JS/actions/auth'
import {useDispatch} from 'react-redux'


const Login=({history})=>{

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const dispatch = useDispatch();

const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("send LOGIN DATA" ,{email,password})
        try{
            let res= await login({email,password})
            // console.log('Login response',res)
            if (res.data){
                console.log("Save User in redux")
                console.log(res.data)

            }
            //save user and token to local storage :
            window.localStorage.setItem('auth',JSON.stringify(res.data));
            //save user to redux :
            dispatch({
              type:"LOGGED_IN_USER",
              payload:res.data,
            });
    
            history.push("/dashboard")  
        }
        catch(err) {
            console.log(err)
            if (err.response.status===400) toast.error(err.response.data)

        }      
     }

    return ( 
    
    <>
    <div className="container-fluid bg-secondary p-5 text-center">
                   <h1>Login</h1>
                 </div>
           
                 <div className="container">
                   <div className="row">
                     <div className="col-md-6 offset-md-3"><LoginForm
                     handleSubmit={handleSubmit}
                     email={email}
                     setEmail={setEmail}
                     password={password}
                     setPassword={setPassword} />
                   </div>
                 </div>
                 </div>
               </>
             );
       }
           
export default Login;