import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { app } from '../firebase.js'
import { useSelector } from 'react-redux'
import { useActionData, useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'

export default function Listing() {
    SwiperCore.use([Navigation])
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                const listingId = params.listingId
                const res = await fetch(`/api/listing/get/${listingId}`);
                const data = await res.json()
                if (data.success == false) {
                    setError(true)
                    setLoading(false)
                }
                setListing(data);
                setLoading(false);
                setError(false)

            } catch (error) {
                setError(true)
            }
        }



        fetchListing()
    }, [params.listingId])
    return (
        <main>
            {loading && <p className=' text-centermy-7 text-2xl'>loading...</p>}
            {error && <p className=' text-centermy-7 text-2xl'>{"Something went wrong I think"}</p>}
            {listing && !loading && (
                <>
                    <Swiper navigation>
                        {listing && !loading && (
                            <div>
                                <Swiper navigation='true'>
                                    {listing.imageURLs.map((url) => (
                                        <SwiperSlide key={url}>
                                            <div className='h-[550px]' style={{ background: `url(${url}) center no-repeat` }}>
                                                {/* Additional content or styling if needed */}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}

                    </Swiper>
                </>
            )}
        </main>
    )
}