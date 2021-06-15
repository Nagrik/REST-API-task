import {NavLink} from "react-router-dom";

const UserPage = ({message}) => {



    return (
        <div className='UserPage'>
            {
                !message ? <h1>Loading...</h1> : <h1>{message}</h1>
            }
            <NavLink to="/" className="NavLink">Back to registration</NavLink>
        </div>
    );
};

export default UserPage;
