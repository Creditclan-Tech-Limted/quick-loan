'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/global/Button';
import { IconCash, IconPlus, IconShoppingCart, IconSolarPanel } from '@tabler/icons-react';
import ClientOnly from './ClientOnly';
import LaunchEligibilityWidget from './LaunchEligibilityWidget';
import Drawer from './global/Drawer';
import { useForm } from 'react-hook-form';
import Input from './global/Input';
import useEligibility from '@/hooks/use-eligibility';

const SecondHere = ({ referral_code }) => {
  const widget = useRef(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [request, setRequest] = useState({})
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
  const { launch: launchAnalyse } = useEligibility({
    data: {
      intro: "Happy to check eligibility for your ride",
      banner: "https://i.ibb.co/F3HsSx0/eligibility-banner.jpg",
      // extra: {
      //   ride_id: data.ride_data.id
      // },
      request: {
        amount: watch().amount,
        tenor: 11,
        tenor_type: 2,
        // product_id: "30003",
        product_id: "29822 ",
      },
      profile: {
        full_name: watch().name,
        email: watch().email,
        phone: watch().phone,
        date_of_birth: null,
        gender: null,
      },
      config: {
        show_bank_account: true,
        platform: "ride",
        show_address: true,
        show_income: true,
        analyze_bank_statement: true,
        show_offers: true,
        show_signature: true,
        tokenize_card: true,
      },
    },
    onReady: () => {
      setLoading("false");
    },
    onCompleted: (data) => {
      console.log({ data });
      // handleEligibilityCompleted({ plan_amount: data.plans[0].plan_amount, request_id: data.request_id });
    },
  });

  const onSubmit = async (data) => {
    try {
      setRequest(data)
      launchAnalyse()
      // console.log({ data, request });
    } catch (error) {
      console.log({ error });
    }
  }

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
            <p className="my-4 text-[.95rem]">
              Experience a new level of convenience. Our streamlined process ensures swift access to funds, requiring minimal documentation. Unlock a range from 100k to 1 million naira.
            </p>
            <div className='space-y-2'>
              <p>Requirements</p>
              <p>▪️ BVN</p>
              <p>▪️ Bio Information </p>
              <p>▪️ Valid Work Id's</p>
              <p>▪️ Next of Kin Details</p>
              <p>▪️ Valid Work Email (not gmail or yahoo)</p>
              <p>▪️ Valid Utility bill (home address)</p>
              <p>▪️ Six (6) months bank statement</p>
            </div>
            <Button className="mt-8" variant="outlined" color='black' onClick={() => setOpenDrawer(true)}>
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
      </div >

      <>
        <Drawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)} title='Request Detials'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            <Input label='Full Name' bordered {...register('name', {
              required: {
                value: true,
                message: 'Full Name is required'
              }
            })} error={errors?.name?.message} />

            <Input type='number' label='Phone' bordered {...register('phone', {
              required: {
                value: true,
                message: ' Phone is required'
              }
            })} error={errors?.phone?.message} />

            <Input type='email' label=' Email' bordered {...register('email', {
              required: {
                value: true,
                message: ' Email is required'
              }
            })} error={errors?.email?.message} />

            <Input type='number' label='Amount' bordered {...register('amount', {
              required: {
                value: true,
                message: ' Amount is required'
              }
            })} error={errors?.amount?.message} />

            <Button type='submit' className='mt-10 text-white' leftIcon={<IconPlus />} >Add New Staff</Button>
          </form>
        </Drawer>
      </>
    </>
  );
};

export default SecondHere;