import axios from "axios";
import {useState, useEffect} from "react";
import Loader from "../../Loader";

const PasswordForm = () => {

    const [pageVis, setPageVis] = useState(true);
    const [pwd, setPwd] = useState();
    const [pwd2, setPwd2] = useState();
    
    const changePwd = (e) => {
        e.preventDefault();

        setPageVis(false);

        if(pwd !== sessionStorage.getItem("old_password")) {
          if(pwd === pwd2 && pwd.length >= 8) {
            axios.post('http://www239.cfgs.esliceu.net/user/password', {
                newPassword: pwd,
                oldPassword: sessionStorage.getItem("old_password"),
              },
              {
                headers: {
                  Authorization: 'Bearer ' + sessionStorage.getItem("accessToken"),
                }
              }
              )
              .then((res) => {
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("user_name");
                setPageVis(true);
              })
              .then(() => {
                alert("se va a cerrar la sesión para que entres con tus nuevas credenciales");
                setPageVis(true);
                window.location = '/login';
              })
              .catch((err) => {
                setPageVis(true);
                console.log(err.errors[0].message);
              })
          } else {
            setPageVis(true);
          }
        } else {
          setPageVis(true);
        }

    }

    if(!pageVis) {
        return <Loader />;
    }

    
    return (
        <div className="container mx-auto px-4 h-full mt-48">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                    <div className="text-center text-3xl font-bold">
                        <h1>Cambiar contraseña</h1>
                    </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    
                    <form onSubmit={e => {changePwd(e)}}>
                    <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Nueva contraseña
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Contraseña"
                          value={pwd}
                          id="pwd"
                          onChange={e => setPwd(e.target.value)}
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Repite la contraseña
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Repite la contraseña"
                          value={pwd2}
                          id="pwd"
                          onChange={e => setPwd2(e.target.value)}
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gradient-to-r from-indigo-500 to-gray-900 hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-500 hover:to-red-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Cambiar contraseña
                        </button>
                      </div>
                    </form>
                  </div>
                  
                </div>
                
              </div>
            </div>
          </div>
    )
}

export default PasswordForm;