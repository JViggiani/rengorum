import axios from 'axios';
import {
  KNOWLEDGE_BASE_GET_URL,
} from './constants';
import {getConfig} from '../utils/config';

export const fetchKnowledgeBaseApi = () => {
  return axios.get(KNOWLEDGE_BASE_GET_URL, getConfig());
};
