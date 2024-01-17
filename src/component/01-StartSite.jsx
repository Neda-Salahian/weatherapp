import Header from "./02-Header.jsx";
import FormUserName from "./03-Form.jsx";

function StartSite({onLogIn}) {
  return (
    <div className="bg-startsite">
      <div className="startSite">
            <Header/>
            <FormUserName onLogIn={onLogIn}/>
        </div>
        
    </div>
  );
}

export default StartSite;
