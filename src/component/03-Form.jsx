import { useState } from "react";
import { Username } from "../context/Username.jsx"
import { useContext } from "react"

function FormUserName(){

    const {name, setName} = useContext(Username);
    const [inputName, setInputName] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false)

    function handleSubmit(event){
        event.preventDefault();

        if(inputName === ""){
            // alert ("Please input your name to continue use the App.")
            setIsSubmitted(true)

            return;
        }

        setName(inputName)
        setIsSubmitted(false)
        setInputName("")
    }

    return (
        <div className="form-section">

        <h2>Weather App</h2>

        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="enter your name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
             />
             <button type="submit">Continue</button>
        </form>

        {isSubmitted && (<p className="submit-text">Please input your name to continue use the App !</p>) }
        </div>
    )
}

export default FormUserName