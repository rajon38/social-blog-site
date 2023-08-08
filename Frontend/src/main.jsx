import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
<<<<<<< HEAD
=======
import './index.css'
>>>>>>> a834a4492b2b1e3e0585b4caad4f97eb9c22ca1e
import {Provider} from "react-redux";
import store from "./redux/store/store.js";
import "./assets/bootstrap.css";
import "./assets/style.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <App/>
      </Provider>
  </React.StrictMode>,
)
