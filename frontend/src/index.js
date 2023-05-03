import React, {Fragment} from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import {Provider} from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import Loader from './components/loader';
import store, {persistor} from './store';
import HeaderContainer from './containers/header';
import ModalContainer from './containers/modal';
import UserProfileContainer from './containers/userprofile';
import UsersContainer from './containers/users';
import ThreadContainer from './containers/thread';
import HomeContainer from './containers/home';
import ForumContainer from './containers/forum';
import NotFoundPage from './components/notfoundpage';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <BrowserRouter>
        <Fragment>
          <header className="header-background" />
          <div className="app-layout">
            <HeaderContainer />
            <Routes>
              <Route path="/users" element={<UsersContainer/>} />
              <Route path="/user/:username" element={<UserProfileContainer/>} />
              <Route path="/forum/:forum" element={<ForumContainer/>} />
              <Route path="/thread/:thread" element={<ThreadContainer/>} />
              <Route exact path="/" element={<HomeContainer/>} />
              <Route element={<NotFoundPage/>} />
            </Routes>
          </div>
          <ModalContainer />
        </Fragment>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
registerServiceWorker();
