/* eslint-disable */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types'
import GoogleIcon from '../../../assets/google-logo.svg'
import styled from 'styled-components'
import Card, {CardPrimaryContent} from "@material/react-card";
import {media} from "../../../helpers/style";
import firebase from 'firebase'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../../store/reducers/auth";
import {getUserFromAuthGoogleUser} from "../../../helpers/auth";

const StyledContent = styled.div`
  text-align: center;
  margin: 150px auto 0 auto;
  user-select: none;
  
  width: 80%;
  
  ${media.phone`
    width: 60%;
  `}
  
  ${media.tablet`
    width: 400px;
  `}
  
  ${media.desktop`
    width: 300px;
  `}
  
  ${media.largeDesktop`
    width: 300px;
  `}
  
  .logo__wrapper {
    cursor: pointer;
  }

  img {
    width: 100px;
    height: 100px;
  }
`;

function SignIn({setupAuth}) {
    const signIn = useCallback(async (event) => {
        try {
            event.preventDefault();
            event.stopPropagation();

            const googleAuth = gapi.auth2.getAuthInstance();
            const googleUser = await googleAuth.signIn({
                prompt: 'select_account'
            });

            const token = googleUser.getAuthResponse().id_token;

            const credential = firebase.auth.GoogleAuthProvider.credential(token);

            await firebase.auth().signInAndRetrieveDataWithCredential(credential);

            setupAuth({
                user: getUserFromAuthGoogleUser(googleUser.getBasicProfile()),
                authenticated: true
            })
        } catch (e) {
            console.log(e)
        }
    }, []);

    return (
        <StyledContent>
            <Card onClick={signIn}>
                <CardPrimaryContent>
                    <div
                        className="logo__wrapper">
                        <img src={GoogleIcon} alt="Google Icon"/>
                    </div>
                    <p>
                        Entrar com google
                    </p>
                </CardPrimaryContent>
            </Card>
        </StyledContent>
    );
}

SignIn.propTypes = {
    setupAuth: PropTypes.func
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setupAuth: actionCreators.setupAuth
}, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);