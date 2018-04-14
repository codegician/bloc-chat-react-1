import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {username: "",
        content: "",
        sentAt: "",
        roomId: ""}
      ],
      newMessage: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.messagesRef = firebase.database().ref('messages');
  }

componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
  });
}

render() {
  let activeMessages = [];
  console.log(this.props.activeRoomKey);
  if(this.props.activeRoomKey !== ""){

    activeMessages = this.state.messages
  .filter(message => {
    console.log(message.roomId + " vs " + this.props.activeRoomKey);
    message.roomId === this.props.activeRoomKey
  })

  }
  else {
    activeMessages = [];
  }
  console.log(activeMessages);
  return (
    <div className="messagelist">
    <h3>Messages</h3>
    <ul>
    {activeMessages.map( (message, index) => {
      return (
        <li className="message"
        key={index}>
          {message.username}: {message.content}
        </li>
      )
    })}
    </ul>
    </div>
  );
  }
}

export default MessageList;
