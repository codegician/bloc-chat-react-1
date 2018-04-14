import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
    constructor(props) {
      super(props);
      this.state = {
        activeRoom: "",
        activeRoomKey: "-L9hCnXhdtQ4CZlI_K22"
      };
    }

    render() {
      return (
        <div>
          <header><h1>Bloc Chat</h1></header>
          <main>
            <div className="roomlist">
              <RoomList
              firebase={firebase}
              activeRoomKey={this.state.activeRoomKey}/>
            </div>
            <div className="messagelist">
              <MessageList
              firebase={firebase}
              activeMessages={this.state.activeMessages}/>
            </div>
          </main>
        </div>
      );
    }
  }


export default App;
