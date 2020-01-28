import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getProfiles, profileError} from '../../actions/profile';
import ProfileItem from './ProfileItem';
import axios from 'axios';
const Profiles = ({getProfiles, profileError}) => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('/api/profile')
            .then(res => {
            getProfiles(res.data);
            setLoading(false);
            setProfiles([...res.data]);
            })
            .catch(err => {
                profileError(err);
            });
    }, []);
    let content = <Spinner />;
    let contentItems = null;
    if (!loading){
        content = (
            <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse And Connect With Developers
                </p>
            </Fragment>
        );
        if(profiles.length > 0){
            contentItems = profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
            ));
        }else{
            contentItems = <h4>No Profiles Found...</h4>
        }
    }
    return(
        <Fragment>
            {content}
            <div className="profiles">
                {contentItems}
            </div>
        </Fragment>
    );
};
export default connect(null, {getProfiles, profileError})(Profiles);