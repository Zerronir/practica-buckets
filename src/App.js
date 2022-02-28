
import {useState, useEffect} from "react";
import BucketItem from "./components/BucketItem";

const App = () => {

  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    setUserLogged(false);
  }, []);

  const buckets = [
    { name: 'bucket 1', uri: 'bucket-1', owner: 'this user', shared: false, own: true },
    { name: 'bucket 2', uri: 'bucket-2', owner: 'other user', shared: true, own: false },
    { name: 'bucket 3', uri: 'bucket-3', owner: 'this user', shared: false, own: true },
    { name: 'bucket 4', uri: 'bucket-4', owner: 'other user', shared: true, own: false },
    { name: 'bucket 5', uri: 'bucket-5', owner: 'this user', shared: false, own: true },
    { name: 'bucket 6', uri: 'bucket-6', owner: 'other user', shared: true, own: false },
    { name: 'bucket 7', uri: 'bucket-7', owner: 'this user', shared: false, own: true },
  ]

  if(userLogged) {
    return(
      <div className="container mx-auto flex justify-between my-10">
        {
          buckets.map((bucket,i) => <BucketItem key={i} name={bucket.name} url={bucket.uri} owner={bucket.owner} shared={bucket.shared} own={bucket.own} />)
        }
      </div>
    )
  } else {
    return(
      <div className="container mx-10 flex">
        <h1 onClick={setUserLogged(true)}>Inicia sesión cerdo</h1>
      </div>
    )
  }
}

export default App;
