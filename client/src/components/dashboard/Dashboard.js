import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
const Dashboard = (props) => {
    useEffect(() => {
        props.onGetCurrentProfile();
    }, []);
    return (props.profile.loading && props.profile.profile === null ? <Spinner /> : <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user"></i>{" "}
                    Welcome {props.auth.user ? props.auth.user.name : null}
                </p>  
                {props.profile.profile !== null ? (
                    <Fragment>
                        <DashboardActions />
                        <Experience experience={props.profile.profile.experience} />
                        <Education education={props.profile.profile.education} />
                        <div className="my-2">
                            <button onClick={() => props.onDeleteAccount()} className="btn btn-danger">
                                <i className="fas fa-user-minus"></i> Delete My Account
                            </button>
                        </div>
                    </Fragment>
                ) : 
                (
                    <Fragment>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
                    </Fragment>
                )}
            </Fragment>);
};
const mapStateToProps = state => {
    return{
        auth: state.auth,
        profile: state.profile
    };
};
const mapDispatchToProps = dispatch => {
    return{
        onGetCurrentProfile: () => dispatch(getCurrentProfile()),
        onDeleteAccount: () => dispatch(deleteAccount())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);