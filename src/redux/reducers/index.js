import { AuthReducer } from "./AuthReducer";
import { NotifyReducer} from './NotifyReducer'
import  {SignalrReducer } from './SingalrReducer'
import {combineReducers} from 'redux'




const rootReducer = combineReducers({
    AuthReducer ,
    NotifyReducer,
    SignalrReducer
})

export default rootReducer
