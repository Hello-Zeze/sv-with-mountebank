import FetchExecute from './fetchExecute';
import CallHeaders from './headers';
const httpInstance = new FetchExecute();

export default new CallHeaders(httpInstance);