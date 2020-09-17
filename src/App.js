
import React, { useState } from 'react';
import './App.css';
import './Rooms.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Stage, Layer, Line } from 'react-konva';


export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      rooms: [
        {students: [],},
        {students: [],},
        {students: [],},
        {students: [],},
        {students: [],},
        {students: [],},
      ],


      students: [{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},{lastName:"toft", email: "ft32801@pausd.us"},],
      selected: "",
    };

  }


   deleteRoom = (evt) => {
    let tempRoom = this.state.rooms;
    tempRoom.splice(this.state.rooms.length-1);
    console.log(tempRoom)
    this.setState({
      rooms: tempRoom
    })
  }

  createRoom = (evt) => {
    let tempRoom = this.state.rooms;
    tempRoom.push({students:[],});
    this.setState({
      rooms: tempRoom
    })
  }

  createStudent = (evt) => {
    evt.preventDefault();
    const currentLastName = evt.currentTarget.children[1].children[0].value;
    const currentEmail = evt.currentTarget.children[2].children[0].value;
    let tempStudents = this.state.students;
    tempStudents.push({lastName: currentLastName, email: currentEmail})
    this.setState({
      students: tempStudents,
    })
  }

  selectStudent = (evt) => {
    const studentKey = evt.currentTarget.children[0].className;
    console.log("selecting " + studentKey)
    this.setState({
      selected: studentKey
    })
  }

  moveStudent = (evt) => {
    const roomId = evt.currentTarget.children[0].className;
    let tempRooms = this.state.rooms;
    let selectedStudent = this.state.students[this.state.selected]

    let tempRoomStudents = tempRooms[roomId].students
    tempRoomStudents.push(selectedStudent)
    tempRooms[roomId] = {
      students: tempRoomStudents
    }
    this.setState({
      rooms: tempRooms
    })


    let tempStudents = this.state.students;

    tempStudents.splice(this.state.selected, 1)
    this.setState({
      students: tempStudents,
      selected: "",
    })

    console.log(this.state.rooms)

  }



  render() {
    return (
      <div className="App">
          <RenderRooms rooms={this.state.rooms} moveStudent={this.moveStudent}/>
          <RoomButtons rooms={this.state.rooms} deleteRoom={this.deleteRoom} createRoom={this.createRoom}/>
          <StudentButtons  students={this.state.students} createStudent={this.createStudent}/>
          <RenderStudents students={this.state.students} selected={this.state.selected} selectStudent={this.selectStudent}/>

      </div>
    )
  }
}



function RenderRooms(props) {

  const roomRender = () => {
    return props.rooms.map((room, n) => {

      let roomStudents = room.students.map((person) => {
        return(<li>{person.lastName}</li>)
      })


       return (
         <li className="room" key={n}>

          <button className="roomItem" onClick={props.moveStudent}>
            <div className={n} />
            <div>{n + 1}</div>
            <ul>{roomStudents}</ul>
          </button>
        </li>);
    })
  }


  return (
    <ul className = "roomList">{roomRender()}</ul>
  )
}

function RoomButtons(props) {
  return (
    <div>
      <div>There are: {props.rooms.length + 1} rooms </div>
      <button className="roomButton" onClick={props.deleteRoom}> - </button>
      <button className="roomButton" onClick={props.createRoom}> + </button>
    </div>
  )
}

function RenderStudents(props) {
  console.log(props.selected);

  const studentRender = () => {
    return props.students.map((student, n) => {
      let thisClass = "studentButton"
      if(props.selected == n) {
        thisClass = "selected"
      }

      return (
        <li className="student" key={n}>
          <button className={thisClass} onClick={props.selectStudent}>
            <div className={n}/>
            <div>{student.lastName}</div>
            <div>{student.email}</div>
          </button>
        </li>
      );
    })
  }
  return(
    <ul className="studentList">{studentRender()}</ul>
  )
 }

 function StudentButtons(props) {
   return (
     <form className="studentForm" onSubmit={props.createStudent}>
       <div>There are: {props.students.length + 1} students </div>
       <div><input placeholder="last name"/></div>
       <div><input placeholder="email"/></div>
       <button className="roomButton" onClick={props.createRoom}> + </button>
     </form>
   )

 }
