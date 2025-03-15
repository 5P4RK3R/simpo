import { createSlice } from '@reduxjs/toolkit';
import { getQuakes } from '../../Services/services';
import { searchFilter } from '../../Helpers/util';
import moment from 'moment';
export const earthQuakeSlice = createSlice({ // Simplifies the action and reducer boilerplate
  name: 'earthQuake',
  initialState: {
    earthQuakes:[],
    data:[],
    loading: false
  },
  reducers: {
    getEarthQuakes: (state,{payload}) => {
      for(const row of payload.features){
        row.properties.time = moment(row.properties.time).format('MMM D,YYYY')
      }
        state.earthQuakes = payload.features;
        state.data = payload.features
    },
    filterEarthQuakeInfo: (state,{payload})=>{
      state.earthQuakes = !!payload ? searchFilter(state.data,payload,'properties') : state.data
    },
    setLoading: (state,{payload}) => {
      state.loading = payload;
    }
  },
});
// Actions
export const { getEarthQuakes,filterEarthQuakeInfo ,setLoading} = earthQuakeSlice.actions;

export const fetchEarthQuakes= ({startDate,endDate,maxMagnitude,minMagnitude,latitude,longitude,radius}) => async dispatch => {
  const start = moment(startDate).format('YYYY-MM-DD')
  const end = moment(endDate).format('YYYY-MM-DD')
  dispatch(setLoading(true));
  const response = await getQuakes({startDate:start,endDate:end,maxMagnitude,minMagnitude,latitude,longitude,radius});
  dispatch(getEarthQuakes(response.data));
  dispatch(setLoading(false));
};

export const searchEarthQuake = (value) => async dispatch => {
  dispatch(filterEarthQuakeInfo(value));
}

export const selectEarthQuake = state => state.earthQuakes;

export default earthQuakeSlice.reducer;
