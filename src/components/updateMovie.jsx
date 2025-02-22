import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UpdateMovies = ({showCard, setShowCard}) => {
    const [updateActor, setUpdateActor] = useState('');
    const[updateTitle, setUpdateTitle] = useState('new movie');
    const [updateDate, setUpdateDate] = useState(0)
    const [updateOscar, setIsUpdateOscar] = useState(false)

    const onSubmit =()=>{
        setShowCard(false);
        console.log(updateActor,updateDate,updateOscar,updateTitle)
    }
    
  return (

    <div className="fixed top-[20%] z-20 bg-gray-200  rounded-md flex flex-col items-center space-y-4 w-100 border-2 border-gray-400">
      <h1 className="text-4xl font-extrabold">Update Movies...</h1>
      <input
      onChange={(e)=>setUpdateTitle(e.target.value)}
        type="text"
        placeholder="Movie title"
        className="border-2 border-cyan-700 py-1 rounded-md"
      />
      setUpdateTitle={setUpdateTitle}
      <input
      onChange={(e)=>setUpdateActor(e.target.value)}
      
        type="text"
        placeholder="Actor"
        className="border-2 border-cyan-700 py-1 rounded-md"
      />
      <input
      onChange={(e)=>setUpdateDate(e.target.value)}
        type="number"
        placeholder="Release date"
        className="border-2 border-cyan-700 py-1 rounded-md"
      />
      <div>
    
        <input 
        onChange={(e)=>setIsUpdateOscar(e.target.checked)}
        type="checkbox" id="check" /> &nbsp;
        <label htmlFor="check" className="text-xl">
          Received an Oscar
        </label>
      </div>
      <div  className=" mt-2 flex flex-row justify-items-center items-center ">
        <button onClick={onSubmit} className="bg-green-600 text-white px-4 py-2 rounded-md font-bold m-2 hover:bg-green-700 shadow-lg">
          Submit
        </button>
        <button  onClick={()=>setShowCard(false)} className="bg-gray-600 text-white px-4 py-2 rounded-md font-bold m-2  hover:bg-gray-700 shadow-lg">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateMovies;
