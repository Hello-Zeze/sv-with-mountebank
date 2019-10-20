export default class CallHeaders {
    constructor(wrapped){
        this.wrapped = wrapped;
    }

    execute(data){
        data.headers = {
            'Content-Type':'application/json'
        };
        return this.wrapped.execute(data);
    }
}