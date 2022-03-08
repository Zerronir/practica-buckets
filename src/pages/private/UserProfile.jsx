import {useState, useEffect} from "react";
import Loader from "../../components/Loader";
import PasswordForm from "../../components/pages_components/user_profile/PasswordForm";
import DeleteAccountForm from "../../components/pages_components/user_profile/DeleteAccountForm";
import axios from "axios";

const UserProfile = () => {
    let user = {
        name: null,
        created_at: null,
        id: null,
    }

    let error = '';

    const [userData, setUserData] = useState(user);
    const [pageVis, setPageVis] = useState(false);
    const [errorMessage, seterrorMessage] = useState(false);

    let url = 'http://www239.cfgs.esliceu.net/user';

    useEffect(() => {

        setTimeout(() => {
            axios.get(`${url}`, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("accessToken")
                }
            })
            .then((res) => {
    
                user.name = res.data.username;
                user.created_at = res.data.created_at;
                user.id = res.data.id;

                setUserData(user);
    
                setPageVis(true);
            })
            .catch(() => {
                seterrorMessage(true);
                setPageVis(true);
                error = 'Inicia sesión por favor';
                sessionStorage.removeItem("accessToken");
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            })
        }, 1000)

    }, []);

    if(user.id === null && sessionStorage.getItem("accessToken") === null) {
        return window.location = '/login'
    }

    if(pageVis && errorMessage) {
        return (
            <div className="container mx-auto">
                Esta página se recargará en 3 segundos, si tu navegador no se recarga de forma automática pulsa <a href="/login">Este enlace</a>
            </div>
        )
    }

    if(!pageVis) {
        return (
            <div className="container mx-auto">
                <Loader />
            </div>
        )
    } else {
        return (
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold">Hola de nuevo! {userData.name} </h1>

                <div className="flex flex-col mx-auto">
                    <PasswordForm />

                    <DeleteAccountForm />
                </div>

            </div>
        )
    }

}

export default UserProfile;