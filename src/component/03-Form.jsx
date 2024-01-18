import { useState } from "react";
import { Username } from "../context/Username.jsx"
import { useContext } from "react"
import { LogInContext } from "../context/LogInContext.jsx";


function FormUserName({onLogIn}){

    const {name,setName} = useContext(Username);
    const {setIsLoggedIn} = useContext(LogInContext);
    const [inputName, setInputName] = useState("");

    function handleSubmit(event){
        event.preventDefault();

        if(inputName === ""){
    
            setIsLoggedIn(false)
            alert("Please input your name !")

            return;
        }

        setName(inputName)
        setIsLoggedIn(false)
        onLogIn(inputName)
        setInputName("")
    }

    return (
        <div className="form-section">

        <h2>Weather App</h2>

        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            name={name}
            placeholder="enter your name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
             />
             <button type="submit">Continue</button>
        </form>

        {/* {!isLoggedIn && (<p className="submit-text">Please input your name to continue use the App !</p>) } */}
        </div>
    )
}

export default FormUserName