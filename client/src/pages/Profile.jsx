import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure,
   deleteUserFailure, 
   deleteUserStart,
   deleteUserSuccess} from '../redux/user/UserSlice'
import { useDispatch } from 'react-redux'

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  

  //To save the state of file

  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  // console.log(formData)

  // Firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if(file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('stateChanged', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
      setFilePerc(Math.round(progress))
    }, 
    (error) => {
      setFileUploadError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => setFormData({ ...formData, avatar: downloadURL})
      );
    }
    );
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userId = currentUser._id;
      if (userId) {
        dispatch(updateUserStart());
        console.log('Dispatch started but didnt work')
      const res = await fetch(`/api/user/update/${userId}`, {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json',
          // 'Authorization': `Bearer ${token}`,
         },
         body : JSON.stringify(formData)

      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message))
        return ;
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)

      }
       else {
        console.error('User ID is undefined or null.');
        return;
      }
     
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }

  }

  // 
  
  const handleDeleteUser = async () => {
    try {
      const userId = currentUser._id;
      if (userId) {
        dispatch(deleteUserStart());
  
        const res = await fetch(`/api/user/delete/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type' : 'application/json',
          }
        });
  
        if (!res.ok) {
          // Handle non-success status
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        const data = await res.json();
  
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
  
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  return (
    <div className='p3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='file' ref= {fileRef} hidden accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
        <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center' 
        onClick={() => fileRef.current.click()} src={`${formData.avatar || currentUser.avatar}?${new Date().getTime()}` } alt='profile' />
        <p className='text-sm self-center'>
          {fileUploadError ? (<span className='text-red-700'> Error uploading image </span>) : filePerc > 0 && filePerc < 100 ? (<span className='
          text-slate-700'>{`Uploading ${filePerc}%`}</span>) : filePerc == 100 ? (<span className='text-green-700'>
            {`Image successfully uploaded`}
          </span>) : ""}
        </p>
        <input type='text' placeholder='username'
        defaultValue={currentUser.username} className='border p-3 rounded-lg' id='username'onChange={handleChange} />
        <input type='email' placeholder='email'
        defaultValue={currentUser.email} className='border p-3 rounded-lg' id='email'onChange={handleChange} />
        <input type='password' placeholder='enter password' className='border p-3 rounded-lg' id='password'onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80'>{loading ? 'loading...' : 'update'}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser}>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 text-center'>{error? error : ''}</p>
      <p className='text-green-700 text-center'>{updateSuccess ? "User successfully updated" : ''}</p>
    </div>
  )
}
