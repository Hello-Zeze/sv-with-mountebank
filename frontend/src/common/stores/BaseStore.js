import { EventEmitter } from 'events';
export default class BaseStore extends EventEmitter {
    constructor(){
        super();
        this.setMaxListeners(0);
    }
    handleActions(action){
        const handler = this._strategies[action.type] || function(){};
        handler.call(this, action);
    }

    emitEvent(eventType, payload){
        this.emit(eventType, payload);
    }

    addEventListener(eventType, callback){
        this.on(eventType, callback);
    }

    removeEventListener(eventType, callback){
        this.removeListener(eventType, callback);
    }

    transformState(func){
        return func(this.state||this);
    }
}