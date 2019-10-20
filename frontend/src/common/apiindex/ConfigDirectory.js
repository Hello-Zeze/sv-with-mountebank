import _ from 'lodash';

class ConfigDirectory {
    constructor(){
        this.directory = {
          gmapsKey: undefined
        };
        
        const getConfig = (localRef, devRef, prodRef) => {
            if (!_.isUndefined(localRef)) {
                return localRef;
            } else if (!_.isUndefined(devRef)) {
                return devRef;
            } else {
                return prodRef;
            }
        };

        this.directory.gmapsKey = process.env.REACT_APP_GMAPS_KEY;
    }

    getConfig(name){
        return this.directory[name];
    }
}

export default new ConfigDirectory();