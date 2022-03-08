import {useState} from "react";
import axios from "axios";
import Loader from "../components/Loader";


const Login = () => {

  const [username, setUsername] = useState();
  const [pageVis, setPageVis] = useState(false);
  const [pwd, setPwd] = useState();

    const login = async (e) => {
      e.preventDefault();

      setPageVis(true);

      setTimeout(() => {
        axios.post('http://www239.cfgs.esliceu.net/login', {
              username: username,
              password: pwd
            })
            .then((res) => {
              console.log(res);
              sessionStorage.setItem("accessToken", res.data.accessToken);
              sessionStorage.setItem("user_name", username);
              sessionStorage.setItem("old_password", pwd); // En una app real esto no se haría ni de coña
              window.location = "/";
            })
            .catch((err) => {
              console.log(err);
            });
      }, 1500)
    }

    if(pageVis) {
      return <Loader />;
    }


    return(
        <div className="container mx-auto px-4 h-full mt-48">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                    <div className="text-center text-3xl font-bold">
                        <h1>Iniciar sesión</h1>
                    </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    
                    <form onSubmit={e => {login(e)}}>
                      <div className="relative w-full my-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Usuario"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Contraseña
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

                      <div className="text-center mt-6">
                        <button
                          className="bg-gradient-to-r from-indigo-500 to-gray-900 hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-500 hover:to-red-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Entrar
                        </button>
                      </div>
                      <div className="flex flex-wrap mt-6">
                        <div className="text-right">
                            <a
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            className="text-black-300 hover:underline hover:text-indigo-500"
                            >
                            <small>Crear una nueva cuenta</small>
                            </a>
                        </div>
                        </div>
                    </form>
                  </div>
                  
                </div>
                
              </div>
            </div>
          </div>
    )
}

export default Login;