import React from 'react'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers/'
import {Provider} from 'react-redux'

const middelware = [thunk]


const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middelware)))



const DataProvider = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider
