import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadBucket = ({visibility}) => {
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState();

    let navigate = useNavigate();

    const fileHandler = (e) => {
      setFile(e.target.files[0]); // Recogemos el archivo del bucket
      console.log(e.target.files[0]);
    }

    const submitForm = (e) => {
      e.preventDefault();

      const data = new FormData();
      data.append('content', file);

      console.log(file.name);
      let userLogged = sessionStorage.getItem('user_name');
      let key = `${userLogged}/${file.name.replaceAll(" ", "_")}`;
      let token = sessionStorage.getItem("accessToken");

      axios.put(`http://www239.cfgs.esliceu.net/objects/${key}`, file, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem("accessToken"),
          'Content-Type': 'application/octet-stream',
        }
      })
      .then((res) => {
        setShowModal(false);
        window.location = '/'
      })
      .catch((err) => {
        setShowModal(false);
      })

      console.log(e);
    }

    return (
      <>
        <button 
          id="uploadNewBucket" 
          className="rounded-full text-2xl bg-gradient-to-r from-indigo-500 to-gray-900 py-4 px-4 font-bold text-white"
          onClick={() => setShowModal(true)}>
            Nuevo Bucket
          </button>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Subir un nuevo bucket
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  
                  <div className="relative p-6 flex-auto">
                  <form onSubmit={e => {submitForm(e)}} enctype="multipart/form-data">
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input type="file"
                      onChange={fileHandler}
                      className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100
                      "/>
                    </label>
                    <div className="flex items-center justify-end my-6 px-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase mt-6 px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase mt-6 text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Subir bucket
                    </button>
                  </div>
                  </form>
                    
                  </div>
                  
                  
                </div>
              </div>
            </div>
            
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

            
          </>
        ) : null}
      </>
    );
}

export default UploadBucket;