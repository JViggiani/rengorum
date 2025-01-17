import {combineReducers} from 'redux';
import auth from './auth';
import modal from './modal';
import register from './register';
import userProfile from './userprofile';
import home from './home';
import users from './users';
import forum from './forum';
import thread from './thread';
import knowledgeBase from './knowledgebase';

const rootReducer = combineReducers({
  auth,
  modal,
  register,
  userProfile,
  home,
  users,
  forum,
  thread,
  knowledgeBase
});

export default rootReducer;
