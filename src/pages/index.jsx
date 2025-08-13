import { useRouter } from "next/router";
import SecondHere from "@/components/SecondHere";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const { r } = router.query;

  return (
    <>
      <SecondHere referral_code={r} />
      {/* <Footer /> */}
    </>
  );
}
