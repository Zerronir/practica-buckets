
import {useState, useEffect} from "react";

const App = () => {

  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {

    let token = localStorage.getItem("userToken");

    if(token !== null) {
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
  }, []);

  if(userLogged === true) {
    return(
      <div className="container mx-10 flex">
        <h1>Hola usuario</h1>
      </div>
    )
  } else {
    return(
      <div className="container mx-10 flex">
        <h1>Inicia sesión cerdo</h1>
      </div>
    )
  }
}

export default App;
