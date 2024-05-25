// module import
import axios from 'axios';
// infrastructure import
import { Http } from './http';

// http factory init
export const http = new Http(axios.create());
