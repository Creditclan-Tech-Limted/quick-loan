'use client'
import React, { useEffect, useRef } from 'react'
import Button from './global/Button';

const SecondHere = ({ referral_code }) => {
  console.log({ referral_code });
  const widget = useRef();

  const handleOpenWidget = async () => {
    try {
      widget.current.open()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const CreditClan = window.CreditClan;
    widget.current = CreditClan?.init('2pXrz4qbDmTRH7ruHxwlY3Jy1N03Db80zCu6AXZG5stOQFwgEN9K5MI1a7joyTBq', { class: 'ccopen', ref: referral_code })
  }, [])
  return (
    <>
      <div className="h-screen w-full py-6 rounded-lg shadow pb-0 relative flex flex-col">
        <div className="bg-responsiveHero bg-cover absolute inset-0 h- w-full"></div>
        <div className="container max-w-7xl mx-auto z-10 relative pl-5 md:pl-[40px]">
          <img src="https://clan.africa/images/clan-light.png" alt="" className='w-24 z-10' />
        </div>
        <div className='text-white relative max-w-7xl mx-auto my-auto'>
          <div className='text-7xl md:text-8xl font-bold text-left md:text-center px-5 md:px-0 leading-1'>
            Get up to <span className='text-yellow-500'> 5 Million</span> Loan in less than 3 minutes
          </div>
          <div className="flex my-10">
            <Button className='mx-5 md:mx-auto' variant='filled' color='white' size='xl' onClick={handleOpenWidget}>
              Get started
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SecondHere;