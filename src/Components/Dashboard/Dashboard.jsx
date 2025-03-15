import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEarthQuake , fetchEarthQuakes, searchEarthQuake } from '../../StoreManager/Slices/earthQuakeSlice';
import { DataTable } from '../DataTable/DataTable';
import { UserInput } from '../UserInput/UserInput';
import { DatePicker } from '../DatePicker/DatePicker';
import './Dashboard.css';
import { earthQuakeHeaders } from '../../Config/constant';
import * as _ from 'lodash';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Popup } from '../Popup/Popup';
import { SelectInput } from '../Select/SelectInput'
export const Dashboard=()=>{
    const resetForm = {startDate:Date.parse('01 Jan 2000 00:00:00 GMT'),endDate:Date.parse('02 Jan 2020 00:00:00 GMT'),maxMagnitude:'',minMagnitude:'',latitude:'',longitude:'',radius:''}
    const  {earthQuakes,loading} = useSelector(selectEarthQuake); // returns the current state of the store for the selected data
    const dispatch = useDispatch(); // trigger actions from the redux store
    const [form,setForm] = useState(resetForm)
    const [popup,setPopup] = useState({open:false,msg:''});
    const dispatchDebounce = _.debounce(dispatch,1000);
    const dispatchCallBack = useCallback(dispatchDebounce,[]);

    useEffect(()=>{
        if(!earthQuakes.length && Object.values(form).every((f)=> !!f)){
            popup.open = !popup.open;
            popup.msg = "Please Select a different value";
            setPopup({...popup});
            setForm(resetForm);
        }
        return ()=>{};
    },[dispatch,earthQuakes])

    const searchList = ({target}) => {
        const {value} = target;
        dispatchCallBack(searchEarthQuake(value))
    }

    const handleForm = ({target}) => {
        const {value,name} = target;
        setForm({...form,[name]:value});
    }

    const setStartDate = (date) => {
        setForm({...form,startDate:date})
    }

    const setEndDate = (date) => {
        setForm({...form,endDate:date})
    }
    const submitForm = ()=>{
        if(Object.values(form).every((f)=> !!f)){
            dispatch(fetchEarthQuakes(form))
        }else{ 
            toggleDialog()
         };
    }
    const toggleDialog = () => {
        popup.open = !popup.open;
        popup.msg = "Fill up the Form";
        setPopup({...popup})
    }
    return(
        <div className="dashboard">
          
            <div className="form">
                <DatePicker label={"Start Date"} value={form.startDate} name="startDate" trigger={setStartDate} />
                <DatePicker label={"End Date"} value={form.endDate} name="endDate" trigger={setEndDate} />
                <UserInput label={"Max Magnitude"} value={form.maxMagnitude} name="maxMagnitude" trigger={handleForm} />
                <UserInput label={"Min Magnitude"} value={form.minMagnitude} name="minMagnitude" trigger={handleForm}  />
                <SelectInput label={"Latitude"} value={form.latitude} name="latitude" trigger={handleForm} options={_.range(-90, 91, 1)} />
                <SelectInput label={"Longitude"} value={form.longitude} name="longitude" trigger={handleForm} options={_.range(-180, 181, 1)} />
                <UserInput label={"Radius(KM)"} value={form.radius} name="radius" trigger={handleForm} />
                
            </div>
            <div className="submit">
            <Button variant="contained" color="primary" onClick={submitForm}>
                    Submit
            </Button>
            </div>
            { 
            <div>
                {loading? (<div className="progress"><CircularProgress /></div> ) : 
                (
                    !!earthQuakes.length ? (<>
                        <div className="filter"><UserInput label="Filter" trigger={searchList}/></div>
                        <DataTable headers={earthQuakeHeaders} data={earthQuakes}/>
                        </>) : null
                )}
            </div>     
        }
        <Popup open={popup.open} trigger={toggleDialog} msg={popup.msg}/>
        </div>
    )
}