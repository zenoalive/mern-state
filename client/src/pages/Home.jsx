import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import  SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import ListingItem from '../components/ListingItem'

export default function Home() {

  const [offerListings, setOfferListings] = useState([])
  const [sellListings, setSellListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation])
  console.log(rentListings)

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json()
        setOfferListings(data)
        fetchSellListings()

      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings()

    const fetchSellListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sell&limit=4')
        const data = await res.json()
        setSellListings(data)
        fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json()
        setRentListings(data)

      } catch (error) {
        console.log(error)
      }
    }
  }, [])
  return (
    <div>
      {/* Top Side */}
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
        <h1 className='font-bold text-slate-700 text-3xl lg:text-4xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />place with ease
        </h1>
        < div className='text-gray-400 text-s sm:text-sm'>
          Lucid Estate is the best place to find your next perfect place to live
          <br />
          We have a wide variety of choices for you to choose from
        </ div>
        <Link to={`/search`} className='text-s sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's get started
        </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation>
        {offerListings && offerListings.length > 0 && offerListings.map((listing) =>(
          <SwiperSlide>
              <div className='h-[500px]' key={listing._id} style= {{background: `url(${listing.imageURLs[0]}) center no-repeat`, backgroundSize: 'cover' }}>

              </div>
          </SwiperSlide>
        ) )}
      </Swiper>


      {/* Listing results for offer sell and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div className='my-3'>
                <div>
                  <h2 className='text-2xl font-semibold text-slate-600'>
                    Recent Offers
                  </h2>
                  <Link to={'/search?offer=true'} className='text-sm text-blue-800 hover: underline'>
                    Show More Offers
                  </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                    {offerListings.map((listing) => (
                          <ListingItem key={listing._id} listing={listing} />
                    ))}
                </div>
            </div>
          )
        }
                {
          rentListings && rentListings.length > 0 && (
            <div className='my-3'>
                <div>
                  <h2 className='text-2xl font-semibold text-slate-600'>
                    Recent Places for rent
                  </h2>
                  <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover: underline'>
                    Show More places for rent
                  </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                    {rentListings.map((listing) => (
                          <ListingItem key={listing._id} listing={listing} />
                    ))}
                </div>
            </div>
          )
        }
                {
          sellListings && sellListings.length > 0 && (
            <div className='my-3'>
                <div>
                  <h2 className='text-2xl font-semibold text-slate-600'>
                    Recent Offers for sell
                  </h2>
                  <Link to={'/search?type=sell'} className='text-sm text-blue-800 hover: underline'>
                    Show More Offers for sell
                  </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                    {sellListings.map((listing) => (
                          <ListingItem key={listing._id} listing={listing} />
                    ))}
                </div>
            </div>
          )
        }

      </div>
    </div>
  )
}
