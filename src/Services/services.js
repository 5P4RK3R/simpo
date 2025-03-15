import axios from 'axios';
import { url } from '../Config/constant';
export const getQuakes = async({startDate,endDate,maxMagnitude,minMagnitude,latitude,longitude,radius})=>{
    return await axios.get(`${url}getQuakes?starttime=${startDate}&endtime=${endDate}&minmagnitude=${maxMagnitude}&minmagnitude=${minMagnitude}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radius}`);
} 