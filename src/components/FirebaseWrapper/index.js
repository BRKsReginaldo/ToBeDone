/* eslint-disable */

import { useEffect, useState, useCallback } from 'react';
import firebase from 'firebase'
import {firebaseConfig, gcloudConfig} from "../../config";
import PropTypes from 'prop-types'
import {loadGapi} from "../../helpers/gapi";

function FirebaseWrapper({children}) {
    const [initialized, setInitialized] = useState(false);

    const setupGapi = useCallback(async() => {
        await loadGapi();
        setInitialized(true)
    }, []);

    useEffect(() => {
        firebase.initializeApp(firebaseConfig);

        setupGapi()
    }, []);

    return initialized && children
}

FirebaseWrapper.propTypes = {
    children: PropTypes.node
};

export default FirebaseWrapper;