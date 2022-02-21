import React from 'react';
 
const ArticleItem = (props) => {
    return (
        <>
<div className="card my-4">
  <img src={props.data.ARTICLE_IMAGE} className="card-img-top image" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{props.data.ARTICLE_TITLE}</h5>
    <a href={props.data.source_link} className="btn btn-primary" target="_blank">Read</a>
  </div>
</div>
        </> 
    );
}
 
 
export default ArticleItem;