import React, { useContext } from 'react';
import "./CourseItem.css"
import UserContext from '../../../context/user/UserContext';

const CourseItem = (props) => {
    const userState = useContext(UserContext);

    const reduceXp = ()=>{
        userState.state.UserCurrentXp = 32;
        userState.updateUserSate(userState.state);
    }

    return (
        <>
            <div className="card item container">
                <img src={props.data.CourseImageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.data.CourseTitle}</h5>
                    <p className="card-text">{props.data.CourseDescription}</p>
                    <a  onClick={reduceXp} type="button" target="_blank" className="btn btn-primary">Enroll</a>
                </div>
            </div>
        </>
    );
}


export default CourseItem;