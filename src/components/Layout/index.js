/* eslint-disable */

import React, {useCallback} from 'react';
import TopAppBar, {
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
    TopAppBarIcon,
    TopAppBarFixedAdjust
} from "@material/react-top-app-bar";
import {connect} from "react-redux";
import MaterialIcon from "@material/react-material-icon";
import firebase from 'firebase'
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/reducers/auth";
import {globalActionCreators} from "../../helpers/redux";
import {capitalize} from "../../helpers/string";
import PropTypes from 'prop-types'

function Layout({user, children, setupAuth, signOut}) {
    const logout = useCallback(event => {
        event.preventDefault();
        event.stopPropagation();

        firebase.auth().signOut();
        gapi.auth2.getAuthInstance().signOut();
        setupAuth({
            user: null,
            authenticated: false
        });
        signOut()
    }, []);

    return (
        <>
            <TopAppBar>
                <TopAppBarRow>
                    <TopAppBarSection
                        align="start">
                        <TopAppBarTitle>Bem Vindo {capitalize(user.firstName)}!</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection
                    align="end"
                    role="toolbar">
                        <TopAppBarIcon actionItem tabIndex={0}>
                            <MaterialIcon
                                onClick={logout}
                                icon="exit_to_app"/>
                        </TopAppBarIcon>
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust>
                {children}
            </TopAppBarFixedAdjust>
        </>
    );
}

Layout.propTypes = {
    user: PropTypes.object,
    setupAuth: PropTypes.func,
    signOut: PropTypes.func,
    children: PropTypes.node
}

const mapStateToProps = ({auth}) => ({
    user: auth.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setupAuth: actionCreators.setupAuth,
    signOut: globalActionCreators.signOut
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);