import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    this.roomsRef = firebase.database().ref('rooms');
  }

componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
  });
}

render() {
  return (
    <div className="roomlist">
    <h1>Rooms</h1>
    <ul>
      {this.state.rooms.map( (room, index) => {
        return (<li className="room" key={index}>
          {room.name}
        </li>)
      })}
    </ul>
    </div>
  );
  }
}

export default RoomList;
