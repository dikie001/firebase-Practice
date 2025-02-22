import { auth, provider } from "../config/firebaseConfig.jsx";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { FaGoogle, FaEnvelope, FaLock, FaSignOutAlt } from 'react-icons/fa';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
        });
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        setError(null);
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user); // Correctly access user from result.user
            console.log("Signed in successfully!", result.user);
        } catch (e) {
            console.error("Google Sign-in Error:", e);
            setError(e.message);
        }
    };

    const signIn = async () => {
        setError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Signed In...");
        } catch (e) {
            console.error("Email/Password Sign-in Error:", e);
            setError(e.message);
        }
    };

    const logOut = async () => {
        setError(null);
        try {
            await signOut(auth);
            setUser(null);
            console.log("Logged Out Successfully!");
        } catch (e) {
            console.error("Sign-out Error:", e);
            setError(e.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700">
                    Welcome to My App
                </h1>

                {user ? (
                    <div className="text-center">
                        <img src={user.photoURL} alt="Profile" className="rounded-full w-24 h-24 mx-auto mb-4" />
                        <p className="text-lg font-semibold mb-2">{user.displayName || user.email}</p>
                        <button onClick={logOut} className="bg-red-700 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg">
                            <FaSignOutAlt className="mr-2" /> Sign Out
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                    className="border border-gray-300 rounded-lg w-full py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="border border-gray-300 rounded-lg w-full py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <button onClick={signIn} className="bg-blue-700 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full mb-4">
                            Sign in
                        </button>

                        <button onClick={signInWithGoogle} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg w-full flex items-center justify-center">
                            <FaGoogle className="mr-2" /> Sign in with Google
                        </button>

                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Auth;