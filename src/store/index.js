import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'

// ENHANCING STORE WITH FIREBASE
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from '../services/firebase'

const createStoreWithFirebase = reactReduxFirebase(firebase)(createStore)
const store = createStoreWithFirebase(reducers, {}, applyMiddleware(reduxThunk))

export default store
