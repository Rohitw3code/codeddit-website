import CourseItem from './CourseItem';
import "firebase/compat/firestore";
import firebase from "../../../Firebase";


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
      {this.state.items.map((element)=>{
        return  <div className='container' key={element.CourseTitle}><CourseItem data = {element} /></div>
      })}
      </>
    );
  }
}
 
export default Courses;
