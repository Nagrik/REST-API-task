import {NavLink} from "react-router-dom";

const UserPage = () => {

    if(!window.sessionStorage.userInfo){
        window.location.reload();
    }

    return (
        <div className='UserPage'>
            <h1>{window.sessionStorage.userInfo}</h1>
            <NavLink to="/" className="NavLink">Back to registration</NavLink>
        </div>
    );
};

export default UserPage;
