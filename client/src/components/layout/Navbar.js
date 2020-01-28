import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
const Navbar = (props) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    Developers
                </Link>
            </li>
            <li>
                <Link to="/posts">
                    Posts
                </Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user" />
                    <span className="hide-sm"> Dashboard</span>
                </Link>
            </li>
            <li>
                <Link onClick={props.onLogout} to="/"><i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span></Link>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return(
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {props.auth.loading ? '' : (<Fragment>{props.auth.isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    );
};
const mapStateToProps = state => {
    return{
        auth: state.auth
    };
};
const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch(logout())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);