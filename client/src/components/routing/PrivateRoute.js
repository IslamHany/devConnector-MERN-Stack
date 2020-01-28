import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from '../auth/Login';
const PrivateRoute = (props) => (
    <Route {...props}>{!props.auth.isAuthenticated && !props.auth.loading ? <Login /> : (props.children)}</Route>
);
const mapStateToProps = state => {
    return{
        auth: state.auth
    };
};
export default connect(mapStateToProps)(PrivateRoute);