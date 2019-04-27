/* eslint-disable */

import {firebaseConfig, gcloudConfig} from "../config";

export const loadGapi = () => new Promise(resolve => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';

    script.addEventListener('load', () => {
        gapi.load('client', () => {
            console.log('loaded client');
            gapi.client.init({
                apiKey: firebaseConfig.apiKey,
                client_id: gcloudConfig.clientId,
                discoveryDocs: [
                    "https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"
                ],
                scope: 'https://www.googleapis.com/auth/tasks'
            });

            gapi.client.load('tasks', 'v1', resolve)
        })
    });

    document.body.appendChild(script)
});

export const GapiClient = () => gapi.client;