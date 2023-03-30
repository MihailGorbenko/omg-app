import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import  {store}  from './app/store/store';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faB,faL,faS,faR, faUserAstronaut, faPersonWalkingLuggage,faRocket} from '@fortawesome/free-solid-svg-icons';
library.add(faB,faL,faS,faR, faUserAstronaut,faPersonWalkingLuggage,faRocket)

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

