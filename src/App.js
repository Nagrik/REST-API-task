import Forms from "./Components/Forms";
import React from "react";
import UserPage from "./Components/UserPage";
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


function App() {
    const history = useHistory();

    const selectMessage = ({auth}) => auth.message
    const selectData = ({auth}) => auth.data
    const message = useSelector(selectMessage)
    const data = useSelector(selectData)
    console.log(message)
    if (message) {
        history.push("/me");
    }
    if (data && data.statusCode === 200) {
        history.push("/me");
    }
    return (
        <div className="App">
            <Route exact path="/" component={Forms}/>
            <Route exact path="/me">
                <UserPage message={message}/>
            </Route>
            {
                sessionStorage.tokenData ? <Redirect to="/me"/> : <Redirect to="/"/>
            }
        </div>
    );
}

export default App;
