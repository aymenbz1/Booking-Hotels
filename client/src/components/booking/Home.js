import {allHotels} from '../../JS/actions/hotels'
import {useState,useEffect} from 'react'
import SmallCard from '../cards/SmallCard'
import Search from '../HotelForm/Search'
import './home.css'
const Home = () => {
//   const { user } = useSelector((state) => ({ ...state }));

const [hotels,setHotels]=useState([])

useEffect (()=>{
 loadAllhotels()
},[])

const loadAllhotels=async()=>{
  let res=await allHotels();
  setHotels(res.data)
};

  return (
    <>
    <div className="col">
      <br/>
      <Search/>
    </div>
    <div className=" aymen container-fluid h1 p-5 text-center">
    <h1>Find the perfect hotel and choose your destination</h1>
    </div> 
    <div className="container-fluid">
      {/* <pre>{JSON.stringify(hotels,null,4)}</pre> */}
      {hotels.map((h)=><SmallCard key={h._id} h={h}/>)}
    </div>
    </>
  );
};

export default Home;