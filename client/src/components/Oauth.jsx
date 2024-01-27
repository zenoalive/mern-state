
import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/UserSlice.js';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result)

      if (result.user) {
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        });

        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        // Handle the case where result.user is undefined (user cancelled sign-in)
        console.error('Google sign-in cancelled by the user');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <button
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90"
      onClick={handleGoogleClick}
    >
      Continue with Google
    </button>
  );
}

