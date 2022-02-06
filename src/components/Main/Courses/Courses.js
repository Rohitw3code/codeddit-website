import CourseItem from './CourseItem';
import "firebase/compat/firestore";
import firebase from "../../../Firebase";
import "./Courses.css"

import React, { Component } from 'react';
 
class Courses extends Component {

  constructor(){
    super();
    this.state = {
      items : [],
      isLoading: true,
    }
  this.ref = firebase.firestore().collection("COURSES").orderBy("PublishDate").limit(4);
  }

  async componentDidMount(){
    this.setState({isLoading:true});
    this.ref.onSnapshot((course)=>{
      course.forEach((doc)=>{
        this.state.items.push(doc.data());
      });
      this.setState({items:this.state.items});
    });
  }



  render() { 
    return (
      <>
      <div className="container">
        <p className='courseTitle'>Free Courses Enroll Now , Each Course Cost You <b>5 XP</b> , some of the courses expires in 4 to 5 hours those course are <b>Premium Course</b> but some course don't have any expiry date , each course expiry date is mentioned below the the course name</p>
      </div>
      {this.state.items.map((element)=>{
        return  <div className='container' key={element.CourseTitle}><CourseItem data = {element} /></div>
      })}
      </>
    );
  }
}
 
export default Courses;
