import axios from "axios";
import { useState } from "react";

const DeleteUser = () => {
    const [showModal, setShowModal] = useState(false);


    const submitForm = (e) => {
      e.preventDefault();

      axios.delete(`http://www239.cfgs.esliceu.net/user`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
          }
      })
      .then(() => {
          localStorage.removeItem("accessToken");
          window.location = '/'
      })
      .catch((err) => {
          alert(err);
      })

      console.log(e);
    }


    return (
      <>
        <button 
          id="uploadNewBucket" 
          className="rounded-full text-2xl bg-gradient-to-r from-red-500 to-red-900 py-4 px-4 font-bold text-white"
          onClick={() => setShowModal(true)}>
            Eliminar cuenta
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
                      ¿Quieres eliminar tu cuenta?
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
                  <form onSubmit={e => {submitForm(e)}}>
                    <p>
                        Estás seguro de que quieres eliminar esta cuenta? Se eliminarán todos tus datos y buckets sin posibilidad de recuperarlos
                    </p>
                    <div className="flex items-center justify-end my-6 px-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase mt-6 px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      No, me he arrepentido
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase mt-6 text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sí, elimina mi cuenta
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

export default DeleteUser;