import uuid from 'uuid/v4';

export default class UuidGenerator{
    static getUuid(){
        return uuid();
    }
}