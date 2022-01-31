import postContext from "./postContext";
import react, { useState } from "react";

const UserState = (props) => {
    const state1 = {
        "id": "no_id",
        "title": "no_title",
        "description": "no_description"
    }

    const [state, setState] = useState(state1);

    const updateState = (v) => {
        setState(v);
        console.log(v);
    }






    return (
        <postContext.Provider value={{ state, updateState }}>
            {props.children}
        </postContext.Provider>
    )
}


export default UserState;