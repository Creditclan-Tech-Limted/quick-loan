'use client';
import React, { useEffect, useRef } from 'react';
import Button from '@/components/global/Button';
import { IconCash, IconShoppingCart, IconSolarPanel } from '@tabler/icons-react';

const SecondHere = ({ referral_code }) => {
  const widget = useRef(null);

  const handleOpenWidget = async () => {
    try {
      widget.current.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const CreditClan = window.CreditClan;
    widget.current = CreditClan?.init('2pXrz4qbDmTRH7ruHxwlY3Jy1N03Db80zCu6AXZG5stOQFwgEN9K5MI1a7joyTBq', {
      class: 'ccopen',
      ref: referral_code
    });
  }, [referral_code]);

  return (
    <>
      <div className="w-full py-6 rounded-lg shadow pb-0 relative flex flex-col">
        <div className="bg-responsiveHero bg-cover absolute inset-0 h- w-full"></div>
        <div className="container max-w-7xl mx-auto z-10 relative pl-5 md:pl-[40px]">
          <img src="https://clan.africa/images/clan-light.png" alt="" className='w-24 z-10' />
        </div>
        <div className='text-white relative max-w-7xl mx-auto my-auto py-[120px] md:pt-[200px] md:pb-[160px]'>
          <div className='text-7xl md:text-8xl font-bold text-left md:text-center px-5 md:px-0 leading-1'>
            Get up to <span className='text-yellow-500'> N5 Million</span> Loan in less than 3 minutes
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-16 md:py-28 px-10 md:px-0">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="px-12 py-16 shadow-lg rounded-3xl relative bg-white">
            <div className="flex mb-8">
              <div className="w-16 h-16 rounded-full flex justify-center items-center bg-blue-500 text-white">
                <IconCash size="32" />
              </div>
            </div>
            <h2 className="text-xl font-medium">
              Get CASH
            </h2>
            <p className="mt-4 text-[.95rem]">
              Experience a new level of convenience. Our streamlined process ensures swift access to funds, requiring minimal documentation. Unlock a range from 100k to 1 million naira.
            </p>
            <Button className="mt-8" variant="outlined" color='black' onClick={handleOpenWidget}>
              Get started
            </Button>
          </div>
          <div className="px-12 py-16 shadow-lg rounded-3xl relative bg-white">
            <div className="flex mb-8">
              <div className="w-16 h-16 rounded-full flex justify-center items-center bg-red-500 text-white">
                <IconShoppingCart size="32" />
              </div>
            </div>
            <h2 className="text-xl font-medium">
              Shop
            </h2>
            <p className="mt-4 text-[.95rem]">
              With a curated selection sourced from our network of 10,000 trusted merchants, you can find the perfect product that suits your needs and style.
            </p>
            <Button className="mt-8" variant="outlined" color='black'>
              <a href="https://shop.clan.africa" target='_blank'>
                Get started
              </a>
            </Button>
          </div>
          <div className="px-12 py-16 shadow-lg rounded-3xl relative bg-white">
            <div className="flex mb-8">
              <div className="w-16 h-16 rounded-full flex justify-center items-center bg-green-500 text-white">
                <IconSolarPanel size="32" />
              </div>
            </div>
            <h2 className="text-xl font-medium">
              Light
            </h2>
            <p className="mt-4 text-[.95rem]">
              Empower your home or business with a reliable inverter. Choose Light Now and step into a world of continuous energy supply!
            </p>
            <Button className="mt-8" variant="outlined" color='black'>
              <a href="https://power.clan.africa" target='_blank'>
                Get started
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondHere;