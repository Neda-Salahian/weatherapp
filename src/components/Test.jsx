import { useContext, useEffect, useState } from "react";
import CatchDetails from "../context/CatchDetails";

const Test = () => {
  const { object, setObject } = useContext(CatchDetails);
  const [city, setCity] = useState("");

  function catchValue(e) {
    e.preventDefault();
    setCity(e.target.elements.text.value);
    e.target.elements.text.value = "";
  }

  useEffect(() => {
    const apiKey = "a859fbd6893bbbb425fca24eecbb0e15";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setObject(data))
      .catch((error) => console.error("error: ", error));
  }, [city, setObject]); 

  console.log(object);

  return (
    <>
      <div className="test">
        <form action="" onSubmit={catchValue}>
          <input type="text" name="text" />
          <input type="submit" value="Suche" />
        </form>
      </div>
    </>
  );
};

export default Test;

