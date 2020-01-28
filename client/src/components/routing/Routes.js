import React from 'react';
import {Route, Switch} from 'react-router';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
const Routes = () => {
    return(
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/profiles" component={Profiles}></Route>
                <Route exact path="/profile/:id" component={Profile}></Route>
                <PrivateRoute exact path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute exact path="/create-profile">
                    <CreateProfile />
                </PrivateRoute>
                <PrivateRoute exact path="/edit-profile">
                    <EditProfile />
                </PrivateRoute>
                <PrivateRoute exact path="/add-experience">
                    <AddExperience />
                </PrivateRoute>
                <PrivateRoute exact path="/add-education">
                    <AddEducation />
                </PrivateRoute>
                <PrivateRoute exact path="/posts">
                    <Posts />
                </PrivateRoute>
                <PrivateRoute exact path="/posts/:id">
                    <Post />
                </PrivateRoute>
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};
export default Routes;