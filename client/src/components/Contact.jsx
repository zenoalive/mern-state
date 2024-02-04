import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const[landlord, setlandlord] = useState(null);
    const[message, setMessage] = useState('')

    const onChange = (e) => {
        setMessage(e.target.value)
    }
    
    useEffect(() => {
        const fetchlandlord = async() => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data = await res.json()
                setlandlord(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchlandlord()
    }, [listing.userRef])
  return (
    <>
     {landlord && (
        <div className='flex flex-col gap-2'>
            <p>
                Contact <span className='font-semibold'>{landlord.username}</span> for
                <span className='font-semibold'> {listing.name.toLowerCase()}</span>
            </p>
            <textarea name='message' id='message' rows='2' value= {message} onChange ={onChange}
            className='w-full border p-3 rounded-lg' placeholder='Enter your message here'>
            </textarea>
            <Link to = {`mailto: ${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-90'>
                Send Message
            </Link>
        </div>
     )}
    </>
  )
}
