/* eslint-disable */

import React, {useEffect, useCallback} from 'react';
import {connect} from "react-redux";
import PageLoader from "../PageLoader";
import SignIn from "../Pages/SignIn";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/reducers/auth";
import firebase from 'firebase'
import {getUserFromAuthGoogleUser} from "../../helpers/auth";
import {globalActionCreators} from "../../helpers/redux";
import PropTypes from 'prop-types'

function AuthWrapper({authenticated, loaded, setLoaded, setupAuth, children, signOut}) {

    const checkUser = useCallback(async () => {
        try {
            let auth2 = gapi.auth2.getAuthInstance();

            if (auth2.isSignedIn.get()) {
                let googleUser = auth2.currentUser.get();
                const user = googleUser.getBasicProfile();

                const token = googleUser.getAuthResponse().id_token;

                const credential = firebase.auth.GoogleAuthProvider.credential(token);

                await firebase.auth().signInAndRetrieveDataWithCredential(credential)

                setupAuth({
                    user: getUserFromAuthGoogleUser(user),
                    authenticated: true
                })
            } else {
                firebase.auth().signOut()
                signOut()
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                console.log(e)
            }
        } finally {
            setLoaded(true)
        }
    }, [setLoaded]);

    useEffect(() => {
        checkUser()
    }, [checkUser]);

    if (authenticated) return children;
    return loaded ? <SignIn/> : <PageLoader/>
}

AuthWrapper.propTypes = {
    authenticated: PropTypes.bool,
    loaded: PropTypes.bool,
    setupAuth: PropTypes.func,
    setLoaded: PropTypes.func,
    signOut: PropTypes.func,
    children: PropTypes.node
}

const mapStateToProps = ({auth}) => ({
    authenticated: auth.authenticated,
    loaded: auth.loaded
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setupAuth: actionCreators.setupAuth,
    setLoaded: actionCreators.setLoaded,
    signOut: globalActionCreators.signOut
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);