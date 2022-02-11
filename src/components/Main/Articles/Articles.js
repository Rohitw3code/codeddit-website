import "firebase/compat/firestore";
import firebase from "../../../Firebase";

import React, { Component } from 'react';
import ArticleItem from "./ArticleItem";
 
class Articles extends Component {

  constructor(){
    super();
    this.state = {
      items : [],
      isLoading: true,
    }
  this.ref = firebase.firestore().collection("ARTICLES").orderBy("PUBLISHER_DATE_TIME").limit(4);
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
      <div className="container my-4">
      </div>
      {this.state.items.map((element)=>{
        return  <div className='container' key={element.ARTICLE_TITLE}><ArticleItem data = {element} /></div>
      })}
      </>
    );
  }
}
 
export default Articles;
