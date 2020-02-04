import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './components/App'

// SETTING UP REDUX STORE
import { Provider } from 'react-redux'
import store from './store'
import firebase from './services/firebase'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

const rrfConfig = {
  userProfile: 'users',
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <HashRouter>
        <App />
      </HashRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)
