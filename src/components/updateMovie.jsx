import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UpdateMovies = ({showCard, setShowCard}) => {
    
  return (
    <div className="fixed top-[20%] z-20 bg-gray-200  rounded-md flex flex-col items-center space-y-4 w-100 border-2 border-gray-400">
      <h1 className="text-4xl font-extrabold">Update Movies...</h1>
      <input
        type="text"
        placeholder="Movie title"
        className="border-2 border-cyan-700 py-1 rounded-md"
      />
      <input
        type="text"
        placeholder="Actor"
        className="border-2 border-cyan-700 py-1 rounded-md"
      />
      <input
        type="number"
        placeholder="Release date"
        className="border-2 border-cyan-700 py-1 rounded-md"
      />
      <div>
        <input type="checkbox" id="check" /> &nbsp;
        <label htmlFor="check" className="text-xl">
          Received an Oscar
        </label>
      </div>
      <div  className=" mt-2 flex flex-row justify-items-center items-center ">
        <button onClick={()=>setShowCard(false)(toast.success("Updated Sucessfully!") )} className="bg-green-600 text-white px-4 py-2 rounded-md font-bold m-2 hover:bg-green-700 shadow-lg">
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
