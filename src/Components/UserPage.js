import {useState} from "react";

const UserPage = ({message}) => {
    const [storage, setStorage] = useState(window.sessionStorage.userInfo);
    return (
        <div className='UserPage'>
            {
                storage ? <h1>{storage}</h1> : <h1>{message}</h1>
            }
        </div>
    );
};

export default UserPage;
