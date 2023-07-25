'use client';
import Hero from './components/Hero';
import SecondHere from './components/SecondHere';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Home() {
  const query = useSearchParams().get('r');

  return (
    <>
      <SecondHere referral_code={ query } />
    </>
  );
}
