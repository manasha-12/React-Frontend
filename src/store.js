import { createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { useLoginReducer, userLoginReducers, userSignupReducers} from './reducers/UserReducers';

const reducer = combineReducers({
    userSignup: userSignupReducers,
    userLogin: userLoginReducers 
})

const initialState = {}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
