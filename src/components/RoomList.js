import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
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

createRoom(e){
  e.preventDefault();
  const newRoomName = this.state.newRoomName;
  this.roomsRef.push({
    name: newRoomName
  });
}

handleChange(e) {
  this.setState({ newRoomName: e.target.value })
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
    <form onSubmit={ (e) => this.createRoom(e) }>
      <input type="text"
      value={ this.state.newRoomName }
      onChange={ (e) => this.handleChange(e) }/>
      <input type="submit" />
    </form>
    </div>
  );
  }
}

export default RoomList;
