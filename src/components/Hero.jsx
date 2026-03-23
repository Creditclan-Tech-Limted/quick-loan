'use client';
import React, { useEffect, useRef } from 'react';
import Button from './global/Button';

const Hero = () => {
  const widget = useRef();

  const handleOpenWidget = async () => {
    try {
      widget.current.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const CreditClan = window.CreditClan;
    widget.current = CreditClan?.init(
      'z2BhpgFNUA8hZiFNveeeeYcTcbnglecgjybqDCSA',
      { class: 'ccopen' }
    );
  }, []);

  return (
    <>
      <div className="w-full bg-gray-900">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <img
            src="https://clan.africa/images/clan-light.png"
            alt=""
            className="w-24"
          />
        </div>
        <div class="pattern-2 relative mx-auto w-full max-w-7xl px-4 py-10 pb-32 md:py-20">
          <div class="container my-auto flex-row md:flex">
            <div className="my-auto">
              <h1 class="font-display my-10 max-w-5xl text-left text-7xl font-bold leading-[1.2] text-slate-300 sm:tracking-tight md:text-[6.5rem]">
                Get up to <br />{' '}
                <span className="text-yellow-600">5 Million</span> <br /> loan
                in 3 Minutes. <br />
              </h1>
              <Button
                variant="outlined"
                color="white"
                size="lg"
                onClick={handleOpenWidget}
              >
                Get started
              </Button>
            </div>
            <div className="my-auto mt-10 max-w-xl md:mt-0">
              <img src="/assets/images/ileyah.gif" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
