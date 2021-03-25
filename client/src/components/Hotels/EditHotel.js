import {useState,useEffect} from 'react';
import {toast} from 'react-toastify';
import {DatePicker,Select} from'antd';
import {read,updateHotel} from '../../JS/actions/hotels'
import {useSelector} from 'react-redux'
import HotelEditForm from '../HotelForm/HotelEditForm'

const {option}=Select;
//We need to get access to the dynamic userId being passed into our route and use it to query the correct user from the API. This is easy to do using react-router-dom. The library passes in a prop called match into every route that is rendered. Inside this match object is another object called params. This holds all matching params where the key is the name we specified when creating the route and the value is the actual value in the URL

const EditHotel = ({match})=>{
 
 //state : 
 const [values ,setValues]=useState({
    title: "",
    content:"",
    location:"",
    price:"",
    from:"",
    to:"",
    bed:"",
})   

const [image, setImage] = useState("")
const [preview,setPreview]=useState("https://via.placeholder.com/250x200.png?text=IMAGE")
const {auth}= useSelector((state)=>({...state}));
const {token}=auth

//destructuring variables from state :
const {title,content,location,price,from,to,bed}=values;


useEffect(()=>{
 loadSellerHotel()
 },[])

const loadSellerHotel=async()=>{
    let res = await read (match.params.hotelId);
    // console.log(res)
    setValues({...values,...res.data})
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`)
    console.log(res)
}

const handleSubmit=async(e)=>{
 e.preventDefault();

 let hotelData = new FormData 
//add data in the formData :first key as string and second the value :
 
hotelData.append('title',title)
 hotelData.append('content',content)
//  hotelData.append('location',location)
 hotelData.append('price',price)
 image && hotelData.append('image',image)
 hotelData.append('from',from)
 hotelData.append('to',to)
 hotelData.append('bed',bed)


 try{
     let res= await updateHotel (token,hotelData,match.params.hotelId)
    console.log("HotelUpdate",res)
    toast.success(`${res.data.title} is updated`)
 }

 catch(err) {
     console.log(err)
    //  toast.error(err.response.data.err)


 }


}

const handleImageChange=(e)=>{
    //creates a DOMString containing an URL representing the object given in parameter :
    setPreview(URL.createObjectURL(e.target.files[0]))
    // console.log(e.target.files[0])
    setImage(e.target.files[0])
  }
  
  const handleChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }


return (
    <>
    <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Hotel</h2>
    </div>
    <div className="container-fluid">
          <div className="row">
           <div className="col-md-10">
           <br/>
            <HotelEditForm 
           values={values}
           setValues={setValues}
           handleChange={handleChange}
           handleImageChange={handleImageChange}
           handleSubmit={handleSubmit}
          //  location={location}
          //  setLocation={SetLocation}
           />
           </div>
           <div className="col-md-2">
           <img src={preview} alt='preview_image'className="img img-fluid m-2"/>
             <pre>{JSON.stringify(values)}</pre>   
           </div>
           </div>
           </div> 
    </>
)

}

export default EditHotel;