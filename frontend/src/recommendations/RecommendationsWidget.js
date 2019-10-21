import React from 'react';
import RecommendationsActionCreator from './RecommendationsActionCreator';
import { RecommendationsActionTypes } from './RecommendationsActionTypes';
import RecommendationsStore from './ RecommendationsStore';
import PropTypes from 'prop-types';
import './recommendations.scss';

export default class RecommendationsWidget extends React.Component {
    static propTypes = {
        ProductId: PropTypes.number.isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            loadSuccess:false,
            recommendations: []
        };
    }

    componentWillMount(){
        RecommendationsStore.addEventListener(RecommendationsActionTypes.RECOMMENDATIONS_LOAD_SUCCESS, this.handleRecommendationsLoadSuccess);
        RecommendationsStore.addEventListener(RecommendationsActionTypes.RECOMMENDATIONS_LOAD_FAIL, this.handleRecommendationsLoadFail);
    }

    componentWillUnmount(){
        RecommendationsStore.removeEventListener(RecommendationsActionTypes.RECOMMENDATIONS_LOAD_SUCCESS, this.handleRecommendationsLoadSuccess);
        RecommendationsStore.removeEventListener(RecommendationsActionTypes.RECOMMENDATIONS_LOAD_FAIL, this.handleRecommendationsLoadFail);
    }

    componentDidMount(){
        RecommendationsActionCreator.loadRecommendations(this.props.ProductId);
    }

    handleRecommendationsLoadSuccess = (data) => {
        this.setState({loadSuccess:true, recommendations:data.recommendations});
    }

    handleRecommendationsLoadFail = (data) => {
        this.setState({loadSuccess:false, recommendations:[]});
    }

    render(){
        return(
            <div></div>
        );
    }
}
