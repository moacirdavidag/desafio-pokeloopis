import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';

import { PlayingProvider } from '../context/PlayingContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlayingProvider>
      <App />
    </PlayingProvider>
  </React.StrictMode>,
)
