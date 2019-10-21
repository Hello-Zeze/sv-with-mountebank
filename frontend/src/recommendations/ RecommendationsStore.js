import Dispatcher from '../Dispatcher';
import BaseStore from '../common/stores/BaseStore';
import { RecommendationsActionTypes } from './RecommendationsActionTypes';

class RecommendationsStore extends BaseStore{
    constructor(){
        super();
    }

    handleActions(action){
        switch(action.type){
            case RecommendationsActionTypes.RECOMMENDATIONS_LOAD_SUCCESS:
                this.handleRecommendationsLoadSuccess(action);
                break;
            case RecommendationsActionTypes.RECOMMENDATIONS_LOAD_FAIL:
                this.handleRecommendationsLoadFail(action);
                break;
            default:
                break;
        }
    }

    handleRecommendationsLoadSuccess(action){
        this.emit(RecommendationsActionTypes.RECOMMENDATIONS_LOAD_SUCCESS, action.payload);
    }

    handleRecommendationsLoadFail(action){
        this.emit(RecommendationsActionTypes.RECOMMENDATIONS_LOAD_FAIL, action.payload);
    }
}

const recommendationsStore = new RecommendationsStore();
recommendationsStore.dispatchToken = Dispatcher.register(recommendationsStore.handleActions.bind(recommendationsStore));
export default recommendationsStore;