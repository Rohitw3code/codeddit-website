import React, { useEffect, useState } from 'react';
import CourseItem from './CourseItem';
import "firebase/compat/firestore";
import firebase from "../../../Firebase";

export default function Courses() {

  const [items,setItems] = useState([]);
  const [id,setId] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  const ref = firebase.firestore().collection("COURSES").orderBy("PublishDate").limit(4);


  const loadCourse = async()=>{
    await ref.onSnapshot((course)=>{
      course.forEach((doc)=>{
          items.push(doc.data());
          id.push(doc.id);            
      });
    });
  }


  useEffect(()=>{
    loadCourse();
  },[]);



  return (
  <>
  {items.map((element)=>{
    return   <div className='container' key={element.CourseTitle}><CourseItem data = {element} /></div>
  })}


  </>);
}
