import { configureStore } from '@reduxjs/toolkit';
import earthQuakeSlice from './Slices/earthQuakeSlice';
export default configureStore({
  reducer: {
    earthQuakes: earthQuakeSlice
  },
});
