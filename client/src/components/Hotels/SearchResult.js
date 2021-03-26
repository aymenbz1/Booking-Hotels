import {useState,useEffect} from 'react'
import queryString from "query-string"
import {Link} from 'react-router-dom'
import Search from "../../components/HotelForm/Search"
import {searchListings} from '../../JS/actions/hotels'
import SmallCard from '../cards/SmallCard'

const SearchResult=()=>{

 //state 
 const [searchLocation,setSearchLocation]=useState('')
 const [searchDate,setSearchDate]=useState('')
 const [searchBed,setSearchBed]=useState('')
 const [hotels,setHotels]=useState([])

//when component mounts , get search params from url and use to send search query to backend :
//change when we change location search :
useEffect(()=>{
    const {location,date,bed}=queryString.parse (window.location.search)
    console.table({location,date,bed})
    searchListings({location,date,bed}).then((res)=>{
    setHotels (res.data) 
    })

},[window.location.search])


return (
<>
<div className="col">
   <br/>
   <Search/>
   </div>
<div className="container">
    <div className="row">
        {hotels.map((h)=>(
        <SmallCard key={h._id} h={h} />))}
    </div>
</div>
</>
)
}
export default SearchResult;