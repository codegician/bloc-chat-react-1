import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: "",
      activeRoom: "",
      activeRoomKey: ""
    };
    this.selectRoom = this.selectRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.roomsRef = firebase.database().ref('rooms');
  }

componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) });
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

selectRoom(e){
  const selectedRoom = e.target.innerText;
  const selectedRoomObj = this.state.rooms.filter(rooms => rooms.name === selectedRoom)
  const selectedRoomIndex = Object.keys(selectedRoomObj);
  const selectedRoomKey = this.state.rooms[selectedRoomIndex].key;
  this.setState({ activeRoomKey: selectedRoomKey });
  console.log(this.state.activeRoomKey);
}

render() {
  let activeRoom = this.state.activeRoom;
  return (
    <div className="roomlist">
    <h3>Rooms</h3>
    <ul>
      {this.state.rooms.map( (room, index) => {
        if (room.name === activeRoom) {
          return (
            <li className="room"
            key={index}
            style={{"fontWeight": "bold"}}
            onClick={(e) => this.selectRoom(e)}>
              {room.name}
            </li>
          )}
          else {
            return (
            <li className="room"
            key={index}
            onClick={(e) => this.selectRoom(e)}>
              {room.name}
            </li>
          )}
      })}
    </ul>
    <form onSubmit={ (e) => this.createRoom(e) }>
      Create room:
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
