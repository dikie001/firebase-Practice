
import { auth, provider } from "../config/firebaseConfig.jsx";
import { createUserWithEmailAndPassword, signInWithPopup,signOut } from "firebase/auth";
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null)

    

    const signInWithGoogle = async () => {
        
        try{
        await signInWithPopup(auth, provider);
        console.log("Signed in successfully!")
        ((result)=>{
            const user = result.user;
            setUser(user)
            alert(user)
        });
   
        }catch(e){
            console.log(e)
        }
        

    };

    const signIn = async () => {
        console.log(email)
        try{
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signed In...")
    }catch(e){
            console.log(e)
        }
        

    };
    const logOut= async ()=>{
        try{
            await signOut(auth);
            console.log("Logged Out Succesfully!")
        }catch(e){
            console.log(e)
        }

    };
  return (


    <div className="flex flex-col justify-center items-center ">
       
      <h1 className="text-3xl font-extrabold flex justify-center">
        Welcome to My App!!!
      </h1>
      <div className="flex flex-col justify-center w-100">
        <input
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="enter email... "
          className="border-2 h-10 font-semibold border-blue-700 rounded-lg outline-0  "
        />
        &nbsp;
        <input
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="enter password..."
          className="border-2 h-10 font-semibold border-blue-700 rounded-lg outline-0  "
        />
        &nbsp; &nbsp;
        <button onClick={signIn} className="bg-blue-700 py-2 px-5 hover:bg-blue-600 text-white rounded-lg shadow-2xl">
          Sign in
        </button>
        &nbsp; 
        <button onClick={signInWithGoogle} className="bg-green-700 py-2 px-5 hover:bg-green-600 text-white rounded-lg shadow-2xl">
          Sign in with Google
        </button>
        &nbsp; 
        <button onClick={logOut} className="bg-red-700 py-2 px-5 hover:bg-red-600 text-white rounded-lg shadow-2xl">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Auth;
