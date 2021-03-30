import React,{useState} from 'react'
import {DatePicker,Select} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import AlgoliaPlaces from 'algolia-places-react'
import moment from 'moment'
import {useHistory} from 'react-router-dom'

//destructure values from ant components :
const {RangePicker}=DatePicker
const {Option} = Select;

const config={
    appId:process.env.REACT_APP_ALGOLIA_APP_ID,
    apiKey:process.env.REACT_APP_ALGOLIA_API_KEY,
   //  container: document.querySelector('#address-input'),
    language:"en",
   //  countries: ["au"],
 }

const Search = ()=>{
   
    //state 

    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [bed, setsBed] = useState("")

    //route
const history = useHistory();

const handleSubmit=()=>{
    history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
}
return(
   <div className="d-flex pb-4">
    <div className="w-100">
        <AlgoliaPlaces 
        placeholder="Location"
        defaultValue={location}
        options={config}
        onChange={({suggestion})=>setLocation(suggestion.value)}
        style={{height:"50px"}}
        />
    </div>
<RangePicker 

 onChange={(value,dateString)=>setDate(dateString)}
 disabledDate={(current)=>
   current && current.valueOf() < moment().subtract(1,"days")
 }
 classeName="w-100"
/>
<Select onChange={(value)=>setsBed(value)}
classeName="w-100"
size="large"
placeholder="Number of beds"
>
    <option key={1}>{1}</option>
    <option key={2}>{2}</option>
    <option key={3}>{3}</option>
    <option key={4}>{4}</option>
</Select>

   <SearchOutlined 
   onClick={handleSubmit} 
   className="btn btn-primary p-3 btn-square" 
   
   />     
    </div>
);
};

export default Search;