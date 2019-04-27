import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import configureStore from "./store";
import FirebaseWrapper from "./components/FirebaseWrapper";
import AuthWrapper from "./components/AuthWrapper";
import Tasks from "./components/Pages/Tasks";
import Layout from "./components/Layout";

const store = configureStore({});

function App() {
  return (
    <Provider store={store}>
      <FirebaseWrapper>
        <AuthWrapper>
            <Layout>
                <Tasks/>
            </Layout>
        </AuthWrapper>
      </FirebaseWrapper>
    </Provider>
  );
}

export default App;
