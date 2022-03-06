import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
const SingleBucket = () => {
    let { key } = useParams();

    const [bucket, setBucket] = useState([]);

    useEffect(() => {
        let user = localStorage.getItem("user_name");
        let full_key = `${user}/${key}`;

        axios.get(`http://www239.cfgs.esliceu.net/objects/${full_key}`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
              }
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);


    return (
        <>
            {key}
        </>
    )
}

export default SingleBucket;