import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

/*<script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>*/
  var config = {
    apiKey: "AIzaSyA5YqUXWBzkBmy_xOTrG24M-ckUf7h1_M8",
    authDomain: "bloc-chat-react-7fb1e.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-7fb1e.firebaseio.com",
    projectId: "bloc-chat-react-7fb1e",
    storageBucket: "bloc-chat-react-7fb1e.appspot.com",
    messagingSenderId: "822112736449",
  };
  firebase.initializeApp(config);

  class App extends Component {
    render() {
      return (
        <div>
          <header>
            <nav>
              <div><Link to='/roomlist'>Room List</Link></div>
            </nav>
          </header>
            <main>
              <Route path="/roomlist" component={RoomList} />
            </main>
        </div>
      );
    }
  }

export default App;
