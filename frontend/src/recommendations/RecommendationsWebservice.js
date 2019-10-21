import Http from '../common/httpapi';
import ApiDirectory from '../common/apiindex/ApiDirectory';

class RecommendationsWebservice {
    constructor(){
        this._webservice = Http;
        this.recommendationsSvc = ApiDirectory.getApiEndpoint('recommendationsSvc');
    }

    loadRecommendations(productId){
        const payload = {
            url:`${this.recommendationsSvc}/${productId}`,
            method: 'GET'
        };
        return this._webservice.execute(payload);
    }    
}

export default new RecommendationsWebservice();