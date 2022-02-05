import React from 'react';
import "./CourseItem.css"

const CourseItem = (props) => {
    return (
        <>
            <div className="card item container">
                <img src={props.data.CourseImageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.data.CourseTitle}</h5>
                    <p className="card-text">{props.data.CourseDescription}</p>
                    <a href={props.data.CourseLink} target="_blank" className="btn btn-primary">Enroll</a>
                </div>
            </div>
        </>
    );
}


export default CourseItem;