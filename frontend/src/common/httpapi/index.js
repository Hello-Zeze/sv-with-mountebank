import FetchExecute from './fetchExecute';
import AuthenticationHeaders from './authentication';
import CallHeaders from './headers';
const httpInstance = new FetchExecute();
const authenticationHeaders = new AuthenticationHeaders(httpInstance);

export default new CallHeaders(authenticationHeaders);