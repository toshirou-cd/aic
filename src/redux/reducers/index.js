import { AuthReducer } from "./AuthReducer";
import { NotifyReducer} from './NotifyReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    AuthReducer ,
    NotifyReducer
})

export default rootReducer
