export default class AuthenticationHeaders {
    constructor(wrapped){
        this.wrapped = wrapped;
    }

    execute(data){
        const token = ''; //TODO: read out real jwt auth token
        data.headers['Authorization'] = token;
        return this.wrapped.execute(data);
    }
}