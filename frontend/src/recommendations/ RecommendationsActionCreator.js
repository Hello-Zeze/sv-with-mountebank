import Dispatcher from '../Dispatcher';
import RecommendationsWebservice from './RecommendationsWebservice';
import {RecommendationsActionTypes} from './RecommendationsActionTypes';

export default class RecommendationsActionCreator {

    static loadRecommendations(productId){
        RecommendationsWebservice.loadRecommendations(productId).then(result=>{
            Dispatcher.dispatch({
                type: RecommendationsActionTypes.RECOMMENDATIONS_LOAD_SUCCESS,
                payload: result
            });
        }).catch(err=>{
            Dispatcher.dispatch({
                type: RecommendationsActionTypes.RECOMMENDATIONS_LOAD_FAIL,
                payload: err
            });
        });
    }
}