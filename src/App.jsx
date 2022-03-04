import Buckets from "./components/Buckets";
import NoBuckets from "./components/modals/error/noBuckets";
import {useState, useEffect} from "react";
import axios from "axios";
import BucketItem from "./components/BucketItem";
import Loading from "./components/Loader";
import UploadBucket from "./components/modals/uploads/uploadBucket";

const App = () => {

  const [userLogged, setUserLogged] = useState(false);

  const [errorModal, setErrorModal] = useState(false);

  const [bucketList, setBucketList] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');

  const [pageVis, setPageVis] = useState(false);

    let url = 'http://www239.cfgs.esliceu.net/objects?prefix=test_raul';
    let token = localStorage.getItem("accessToken");

    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
        
      }
    }

    useEffect(() => {
        if(token !== null) {
          axios.get(`${url}`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("accessToken"),
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            setBucketList(res.data.versions);
            setPageVis(true);
          })
          .catch((err) => {
            setErrorMessage(err.message);
            setErrorModal(true);
            setPageVis(true);
          })
        }
    }, []);

  useEffect(() => {

    if(token !== null) {
      setUserLogged(true);
      setPageVis(true);
    } else {
      setUserLogged(false);
      setPageVis(true);
    }
  }, []);

  if(!pageVis) {
    return (
      <div className="container mx-auto">
          <Loading />
      </div>
    )
  }

  if(userLogged === true) {
    return(
      <div className="container mx-auto flex flex-col justify-between">
        <div className="flex flex-end">
          <NoBuckets showAlert={errorModal} error={errorMessage} />
        </div>

        <div className="container mx-auto flex my-4">
          <UploadBucket />
        </div>

        <div className="flex justify-between">
        {
          bucketList.map((bucket, i) => {
            return i % 2 === 0 ? <BucketItem bucket={bucket} bg_color={"bg-white"} key={i} /> : <BucketItem bucket={bucket} bg_color={"bg-gray-200"} key={i} />;
          })
        }
        </div>
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
