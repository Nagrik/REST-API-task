import {NavLink} from "react-router-dom";
import {useState} from "react";

const UserPage = ({message}) => {
    const [storage, setStorage] = useState(window.sessionStorage.userInfo);
    console.log(message)
    return (
        <div className='UserPage'>
            {
                storage ? <h1>{storage}</h1> : <h1>{message}</h1>
            }
            <NavLink to="/" className="NavLink">Back to registration</NavLink>
        </div>
    );
};

export default UserPage;
