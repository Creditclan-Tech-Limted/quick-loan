'use client'
import React, { useEffect, useRef } from 'react'
import Button from './global/Button'

const Hero = () => {
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
    widget.current = CreditClan?.init('z2BhpgFNUA8hZiFNveeeeYcTcbnglecgjybqDCSA', { class: 'ccopen' })
  }, [])

  return (
    <>
      <div className="w-full bg-gray-900">
        <div className="container max-w-7xl mx-auto py-8 px-4">
          <img src="https://clan.africa/images/clan-light.png" alt="" className='w-24' />
        </div>
        <div class="w-full pb-32 py-10 md:py-20 pattern-2 relative max-w-7xl mx-auto px-4">
          <div class="container flex-row md:flex my-auto">
            <div className="my-auto">
              <h1 class="text-left max-w-5xl my-10 font-display text-7xl md:text-[6.5rem] font-bold leading-[1.2] sm:tracking-tight text-slate-300">Get up to <br /> <span className='text-yellow-600'>5 Million</span> <br /> loan in 3 Minutes. <br />
              </h1>
              {/* <p class="mt-8 max-w-2xl text-lg tracking-tight text-slate-400">No more Tenant Palava... Get Paid Now.</p> */}
              <Button variant='outlined' color='white' size='lg' onClick={handleOpenWidget}>
                Get started
              </Button>
            </div>
            <div className="my-auto max-w-xl mt-10 md:mt-0">
              <img src="/assets/images/ileyah.gif" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero