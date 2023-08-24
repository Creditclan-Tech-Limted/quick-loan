import { useState } from 'react';
import Button from '@/components/global/Button';
import { IconCash, IconShoppingCart, IconSolarPanel } from '@tabler/icons-react';
import Drawer from './global/Drawer';
import { useForm } from 'react-hook-form';
import Input from './global/Input';
import useEligibility from '@/hooks/use-eligibility';
import axios from 'axios';
import Select from './global/Select';

const durations = [
  { text: '1 Month', value: 1 },
  { text: '2 Month', value: 2 },
  { text: '3 Month', value: 3 },
  { text: '4 Month', value: 4 },
  { text: '5 Month', value: 5 },
  { text: '6 Month', value: 6 },
  { text: '7 Month', value: 7 },
  { text: '8 Month', value: 8 },
  { text: '9 Month', value: 9 },
  { text: '10 Month', value: 10 },
  { text: '11 Month', value: 11 },
  { text: '12 Month', value: 12 }
]

const SecondHere = ({ referral_code }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [request, setRequest] = useState({})
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [views, setViews] = useState('requirements')
  const { launch } = useEligibility({
    data: {
      banner: "https://i.ibb.co/F3HsSx0/eligibility-banner.jpg",
      referral_code,
      request: {
        amount: watch().amount,
        tenor: watch().duration,
        tenor_type: 2,
        product_id: "30025",
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
        show_address: true,
        show_income: true,
        analyze_bank_statement: true,
        show_offers: true,
        show_signature: true,
        tokenize_card: true,
        verify_work_email: true,
        show_attachments: true,
        attachments_list: ['Utility bill'],
        show_address: true,
        show_offers: false,
      },
    },
    onReady: () => {
      setIsLoading(false);
    },
    onCompleted: (data) => {
      axios.post(`https://sellbackend.creditclan.com/merchantclan/public/index.php/api/personal/loans/${request?.id}/offer`, { creditclan_request_id: data?.request_id, offer: watch().amount });
      setViews('success')
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await saveLoan();
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const saveLoan = async () => {
    try {
      const res = await axios.post(`https://sellbackend.creditclan.com/merchantclan/public/index.php/api/personal/loan`, { name: watch().name, amount: watch().amount, duration: watch().duration, email: watch().email, agent_phone: referral_code, phone: watch().phone });

      console.log(res.data.data);
      if (!res?.data?.status) {
        setViews('request_exist');
        setRequest(res?.data?.data);
        return
      }
      setRequest(res?.data?.data?.request);
      launch();
    } catch (error) {
      console.log(error);
    }
  }
  const cancelLoan = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`https://sellbackend.creditclan.com/merchantclan/public/index.php/api/personal/loans/${request?.id}/cancel`);
      setViews('request_details');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
      <div className="bg-gray-100 py-16 md:py-28 px-5 md:px-0">
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
      </div>

      <>
        <Drawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)} title='Request Detials'>
          {views === 'requirements' && (
            <>
              <div className='space-y-2'>
                <p className='text-2xl font-semibold'>Loan Requirements</p>
                <p className='!mt-5'>▪️ BVN</p>
                <p>▪️ Bio Information </p>
                <p>▪️ Valid Work Ids</p>
                <p>▪️ Next of Kin Details</p>
                <p>▪️ Valid Work Email (not gmail or yahoo)</p>
                <p>▪️ Valid Utility bill (home address)</p>
                <p>▪️ Six (6) months bank statement</p>
              </div>
              <Button className='text-white mt-16' onClick={() => setViews('request_details')}> Continue </Button>
            </>
          )}

          {views === 'request_exist' && (
            <>
              <p className='text-xl font-bold'>Request Already Exist</p>
              <div className='border border-black space-y-3 p-3 rounded mt-5'>
                <p>Name: </p>
                <p>Email: </p>
                <p>Phone: </p>
                <p>Amount: </p>
                <p>Duration: </p>
              </div>

              <Button color='red' className='mt-10' onClick={cancelLoan} loading={isLoading}>Cancel</Button>
            </>
          )}

          {views === 'request_details' && (
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
                  message: 'Amount is required',
                },
                min: {
                  value: 150000,
                  message: 'Minimum Amount is 150,000'
                },
                max: {
                  value: 1000000,
                  message: 'Maximum amount is 1,000,000'
                },
              })} error={errors?.amount?.message} />

              <Select label='Durations' options={durations} {...register('duration', {
                required: {
                  value: true,
                  message: 'Duration is required',
                },
              })}
                error={errors?.duration?.message} />

              <Button type='submit' loading={isLoading} className='mt-10 text-white'>Continue</Button>
            </form>
          )}

          {views === 'success' && (
            <>
              <div className="pt-42">
                <img src="/assets/images/Young and happy-bro.svg" alt="" />
                {/* <IconCheck color='green' size={300} /> */}
                <p className="text-4xl font-bold text-center">
                  Congratulations, <br /> We are good to go
                </p>
              </div>
              <Button className='text-white mt-5' onClick={() => setOpenDrawer(false)} >Close</Button>
            </>
          )}

        </Drawer>
      </>
    </>
  );
};

export default SecondHere;
