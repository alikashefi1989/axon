import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { persistedStore, store } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import "./assets/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);