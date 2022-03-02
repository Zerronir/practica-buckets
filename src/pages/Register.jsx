import {useState} from "react";
import axios from "axios";

const Register = () => {

    const [username, setUsername] = useState();
    const [pwd, setPwd] = useState();
    const [pwdCheck, setPwdCheck] = useState();

    const validateUsername = (username) => {
      if(username !== null) return true;
      return false;
    }

    const validatePassword = (pwd) => {
      if(pwd !== null) return true;
      return false;
    }

    const checkPasswordMatch = (pwd, pwdCheck) => {
      if(pwd === pwdCheck && (pwd !== null && pwdCheck !== null)) return true;
      return false;
    }

    const doLogin = async (e) => {
      e.preventDefault();

      let pwdChecker = checkPasswordMatch(pwd, pwdCheck);
      let validUser = validateUsername(username);
      let validPwd = validatePassword(pwd);

      if(pwdChecker && validPwd && validUser) {
        axios.post('http://www239.cfgs.esliceu.net/signup', {
              username: username,
              password: pwd
            })
            .then((res) => {
              localStorage.setItem("userToken", res.data.id);
              window.location = "/";
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
        
        if(!validPwd) {
          document.querySelector("#pwd").classList.add("border-2");
          document.querySelector("#pwd").classList.add("border-red-500");
        }

        if(!validUser) {
          document.querySelector("#userName").classList.add("border-2");
          document.querySelector("#userName").classList.add("border-red-500");
        }

        if(!pwdChecker) {
          document.querySelector("#pwd").classList.add("border-2");
          document.querySelector("#pwd").classList.add("border-red-500");
          
          document.querySelector("#pwdCheck").classList.add("border-2");
          document.querySelector("#pwdCheck").classList.add("border-red-500");
        }

      }

    }

    return(
        <div className="container mx-auto px-4 h-full mt-48">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                    <div className="text-center text-3xl font-bold">
                        <h1>Registrarse</h1>
                    </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    
                    <form onSubmit={e => {doLogin(e)}}>
                      <div className="relative w-full my-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-2 focus:border-indigo-500 w-full"
                          placeholder="Email"
                          id="userName"
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
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-2 focus:border-indigo-500 w-full"
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
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-2 focus:border-indigo-500 w-full"
                          placeholder="Repite la contraseña"
                          onChange={e => setPwdCheck(e.target.value)}
                          value={pwdCheck}
                          id="pwdCheck"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="text-center flex flex-row mt-6">
                        <button
                          className="basis-1/2 bg-gradient-to-r from-indigo-500 to-gray-900 hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-500 hover:to-red-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-auto"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Registrate!
                        </button>
                        <button
                          className="basis-1/2 bg-gradient-to-r from-indigo-500 to-gray-900 hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-500 hover:to-red-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-auto"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          Vaciar formulario
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

export default Register;