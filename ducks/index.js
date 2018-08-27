import { combineReducers } from 'redux';
import { timeEntriesReducer } from './time-entries';

const rootReducer = combineReducers({
  timesheetEntries: timeEntriesReducer
});

export default rootReducer;
