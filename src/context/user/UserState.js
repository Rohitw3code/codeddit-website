import React, { useState } from 'react';

import UserContext from './UserContext';

const UserState = (props)=>{

    const defaultState = {
        "logged": false,
        "UserName": "name",
        "UserEmail": "email",
        "UserId": "no_id",
        "UserJoinDate": 0,
        "UserImageUrl": "",
        "UserQualification": "",
        "UserPSNo": 0,
        "UserDescription": "",
        "UserCurrentXp": 100,
        "UserTotalXpEverEarned": 0,
        "numFollower": 0,
        "numFollowing": 0,
        "lastLoginAt": 0
    }

    const [state,setState] = useState(defaultState);
    
    const updateUserSate = (data)=>{
        setState(data);
    }

    return (
        <UserContext.Provider value={{state,updateUserSate}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;


