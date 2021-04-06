import {useState} from 'react';
import {toast} from 'react-toastify';
import {DatePicker,Select} from'antd';
import {createHotel} from '../../JS/actions/hotels'
import {useSelector} from 'react-redux'
import HotelCreateForm from '../HotelForm/HotelCreateForm'
import './NewHotel.css'

const {option}=Select
const config={
   appId:process.env.REACT_APP_ALGOLIA_APP_ID,
   apiKey:process.env.REACT_APP_ALGOLIA_API_KEY,
  //  container: document.querySelector('#address-input'),
   language:"en",
  //  countries: ["au"],
}


const NewHotel = () => {
//redux 
const {auth}= useSelector((state)=>({...state}));
const {token}=auth


    //state : 
    const [values ,setValues]=useState({
     title: "",
     content:"",
     location:"",
     image:"",
     price:"",
     from:"",
     to:"",
     bed:"",
})
const [preview,setPreview]=useState("https://via.placeholder.com/250x200.png?text=IMAGE")

//destructuring variables from state :
const {title,content,location,image,price,from,to,bed}=values;

const handleSubmit=async(e)=>{
e.preventDefault();

let hotelData= new FormData
//add data in the formData :first key as string and second the value :
hotelData.append('title',title)
hotelData.append('content',content)
hotelData.append('location',location)
hotelData.append('price',price)
image && hotelData.append('image',image)
hotelData.append('from',from)
hotelData.append('to',to)
hotelData.append('bed',bed)

console.log([...hotelData]);
try{
let res= await createHotel(token,hotelData)
toast('New hotel is posted ')
//data will be empty after that time when we get response :
setTimeout(()=>{
  window.location.reload();
},2000);
}
catch (err){
  console.log(err);
  toast.error(err.response.data);
}
};

const handleImageChange=(e)=>{
  //creates a DOMString containing an URL representing the object given in parameter :
  setPreview(URL.createObjectURL(e.target.files[0]))
  // console.log(e.target.files[0])
  setValues({...values,image:e.target.files[0]})
}

const handleChange=(e)=>{
  setValues({...values,[e.target.name]:e.target.value})
}





      return (
        <div className='form'>
        <div className="add container-fluid  p-5 text-center">
        <h2>Add Hotel</h2>
        </div> 
        <div className="container-fluid">
          <div className="row">
           <div className="col-md-10">
           <br/>
           <HotelCreateForm 
           values={values}
           setValues={setValues}
           handleChange={handleChange}
           handleImageChange={handleImageChange}
           handleSubmit={handleSubmit}
          //  location={location}
          //  setLocation={SetLocation}
           />
           <div className="col-md-2">
             {/* <img src={preview} alt='preview_image'className="img img-fluid m-2"/> */}
             {/* <pre>{JSON.stringify(values)}</pre> */}
             </div>
           </div>
          </div>
        </div>
        </div>
      );
    };
    
    export default NewHotel;

