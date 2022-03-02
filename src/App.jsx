import Buckets from "./components/Buckets";
import NoBuckets from "./components/modals/error/noBuckets";
import {useState, useEffect} from "react";
import axios from "axios";

const App = () => {

  const [userLogged, setUserLogged] = useState(false);

  const [errorModal, setErrorModal] = useState(false);

  const [bucketList, setBucketList] = useState([]);

    let url = 'http://www239.cfgs.esliceu.net/objects';
    let token = localStorage.getItem("accessToken");

    let message = '';

    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    useEffect(() => {
        if(token !== null) {
          axios.get(`${url}`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("accessToken")
            }
          })
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            message = err.message;
            setErrorModal(true);
            console.log(err.message)
          })
        }
    }, []);

  useEffect(() => {

    if(token !== null) {
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
  }, []);

  if(userLogged === true) {
    return(
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-end">
          <NoBuckets showAlert={true} error={message} />
        </div>
        <Buckets />
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
