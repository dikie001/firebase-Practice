import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Auth from "./components/auth";
import Auth2 from "./components/auth2";
import { db } from "./config/firebaseConfig";
import { useEffect } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import Notification from "./components/notification";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [notif, setNotif] = useState(false);
  const movieCollectionRef = collection(db, "movies");
  const [newMovie, setNewMovie] = useState("");
  const [newActor, setNewActor] = useState("");
  const [newDate, setNewDate] = useState(0);
  const [newOscar, setNewOscar] = useState(false);

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const fileteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovies(fileteredData);
      console.log(fileteredData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMovieList();
    console.log(
      "%c Movies Loaded Sucessfully!!!",
      "color:green; font-size:20px "
    );
  }, []);
  const submitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovie,
        Actor: newActor,
        releaseDate: newDate,
        receivedAnOscar: newOscar,
      });

      setNotif(true);
      setTimeout(() => {
        setNotif(false);
      }, 2000);
      getMovieList();
    } catch (e) {
      console.log(e);
    }
    setNewMovie("");
    setNewActor("");
    setNewDate(0);
    setNewOscar(false);
  };
  const delMovie = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmDelete) return;

    toast.error("Feature not available!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const likeMovie = () => {
    toast.success("Movie liked!", {
      position: "top-right",
      autoClose: 2000,
    });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center mt-4">
        <h1 className="text-4xl font-extrabold">Add Movies...</h1>
        <input
          onChange={(e) => setNewMovie(e.target.value)}
          type="text"
          placeholder="Movie title"
          className="rounded-sm shadow-md border-2 p-1 border-blue-400 bg-cyan-200"
        />{" "}
        &nbsp;
        <input
          onChange={(e) => setNewActor(e.target.value)}
          type="text"
          placeholder="Actor"
          className="rounded-sm shadow-md border-2 p-1 border-blue-400 bg-cyan-200"
        />
        &nbsp;
        <input
          onChange={(e) => setNewDate(e.target.value)}
          type="number"
          placeholder="Release date"
          className="rounded-sm shadow-md border-2 p-1 border-blue-400 bg-cyan-200"
        />
        &nbsp;
        <div>
          <input
            checked={newOscar}
            onChange={(e) => setNewOscar(e.target.checked)}
            type="checkbox"
            id="check"
          />{" "}
          &nbsp;
          <label htmlFor="check" className="text-xl">
            Received an Oscar
          </label>
        </div>
        <button
          onClick={submitMovie}
          className="py-1 px-2 text-white hover:bg-cyan-950 bg-cyan-700 m-2 rounded-sm"
        >
          Submit
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center items-center mt-4">
        {movies.map((movie) => (
          <div
            className="flex flex-col relative justify-center h-70 items-center border-2  border-gray-200 p-4 m-4 rounded-md
          shadow-lg bg-blue-100"
          >
            <h1
              className="text-2xl font-extrabold flex justify-center items-center"
              style={{ color: movie.receivedAnOscar ? "green" : "red" }}
            >
              {movie.title}
            </h1>
            <p className="text-xl font-semibold">Actor: {movie.Actor}</p>
            <p className="font-semibold text-xl">Date: {movie.releaseDate}</p>
            <button
              onClick={delMovie}
              className="text-white font-bold bg-red-600 py-1 px-2 absolute bottom-1 left-1 rounded-md hover:bg-red-900"
            >
              Delete
            </button>
            <button
              onClick={likeMovie}
              className="text-white font-bold bg-green-600 py-1 px-4 hover:bg-green-700 rounded-md absolute bottom-1 right-1"
            >
              Like
            </button>
          </div>
        ))}
      </div>
      {notif && <Notification />}
    </div>
  );
};

export default App;
