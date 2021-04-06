
import AlgoliaPlaces from 'algolia-places-react';
import {DatePicker,Select} from'antd';
import moment from 'moment';



const {option}=Select
const config={
   appId:process.env.REACT_APP_ALGOLIA_APP_ID,
   apiKey:process.env.REACT_APP_ALGOLIA_API_KEY,
  //  container: document.querySelector('#address-input'),
   language:"en",
  //  countries: ["au"],
}

//Form hotel :

const HotelCreateForm=(props)=>{
 const {
     values,
     setValues,
     handleChange,
     handleImageChange,
     handleSubmit,
     location,
     setLocation
    }=props;
 const {title,content,price}=values;
 
      return (
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="btn btn-outline-secondary btn-block m-2 text-left">
       
            <input type="file" 
             name="image" 
             onChange={handleImageChange} 
             accept="image/*" 
            //  hidden
            
             />
          </label>
       
       <input 
       type="text" 
       name="title" 
       onChange={handleChange} 
       placeholder="Title" 
       className="form-control m-2" 
       value={title}
       />
       
       <textarea
       name="content" 
       onChange={handleChange} 
       placeholder="content" 
       className="form-control m-2" 
       value={content}
       />
       
       <AlgoliaPlaces 
       className="form-control ml-2 mr-2"
       placeholder="Location"
       defaultValue={location}
       options={config}
       onChange={({suggestion})=>
       setValues({...values,location:suggestion.value})
       }
       style={{height:'50px'}}
       />
       
       <input 
       type="number" 
       name="price" 
       onChange={handleChange} 
       placeholder="price" 
       className="form-control m-2" 
       value={price}
       />
       
       
       <Select onChange={(value)=>setValues({...values,bed:value})}
       className="w-100 m-2"
       size="large"
       placeholder="Number of beds"
        >
         
         <option key={1}>{1}</option>
         <option key={2}>{2}</option>
         <option key={3}>{3}</option>
         <option key={4}>{4}</option>
       </Select>
       
       <DatePicker 
       placeholder="From date"
        className="form-control m-2" 
        onChange={(date,dateString)=> setValues({...values,from:dateString})}
        disabledDate={(current)=>current && current.valueOf()<moment().subtract(1,"days")
       }
        />
       
       <DatePicker 
       placeholder="To date"
        className="form-control m-2" 
        onChange={(date,dateString)=> setValues({...values,to:dateString})}
        disabledDate={(current)=>current && current.valueOf()<moment().subtract(1,"days")
       }
        />
       
        </div>
       
        <button className='btn btn-outline-primary m-2'>Save</button>
       </form>
      );
    };
    
    export default HotelCreateForm;