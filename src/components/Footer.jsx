import Link from 'next/link';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconMail, IconMapPin, IconPhone, IconPhoneCall } from "@tabler/icons-react";

const Footer = () => {
  const mode = 'light';
  return (
    <>
      <footer className="md:bg-[#F1F1F8]">
        <div className="container max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 pt-32 pb-24 space-y-10 md:space-y-0">
            <div className="md:col-span-3">
              <Link href="/" className="flex items-center">
                {
                  mode.dark ?
                    <img
                      src="/assets/images/ileyah-logo.png"
                      className="h-8 mr-3"
                      alt="Ileya Logo"
                    /> :
                    <img
                      src="https://clan.africa/images/clan.png"
                      className="h-8 mr-3"
                      alt="Ileya Logo"
                    />
                }
              </Link>
            </div>
            <div className="md:col-span-3">
              <h5 className="font-semibold mb-5">
                <Link href="#" className="flex items-center">
                  Product
                </Link>
              </h5>
              <div className="space-y-3">
                <div>
                  <Link
                    href="#"
                    className={`flex items-center ${mode.dark ? 'md:text-gray-500' : 'md:text-black'}`}
                  >
                    Get Cash
                  </Link>
                </div>
                <div>
                  <Link
                    href="#"
                    className={`flex items-center ${mode.dark ? 'md:text-gray-500' : 'md:text-black'}`}
                  >
                    Shop Now
                  </Link>
                </div>
                <div>
                  <Link
                    href="#"
                    className={`flex items-center ${mode.dark ? 'md:text-gray-500' : 'md:text-black'}`}
                  >
                    Power Now
                  </Link>
                </div>
                {/* <div>
                  <Link
                    href="#"
                    className={`flex items-center ${mode.dark ? 'md:text-gray-500' : 'md:text-black'}`}
                  >
                    Find Artisans(Beta)
                  </Link>
                </div> */}
              </div>
            </div>
            <div className="md:col-span-3">
              <h5 className="font-semibold mb-5">
                <Link href="#" className="flex items-center">
                  Quick Links
                </Link>
              </h5>
              <div className="space-y-3">
                <div>
                  <Link
                    href="#" className={`flex items-center ${mode.dark ? 'md:text-gray-500' : 'md:text-black'}`}
                  >
                    Terms & conditions
                  </Link>
                </div>
                <div>
                  <Link
                    href="#" className={`flex items-center ${mode.dark ? 'md:text-gray-500' : 'md:text-black'}`}
                  >
                    Pivacy Policy
                  </Link>
                </div>
                <div>
                  <Link
                    href="#" className={`flex items-center ${mode.dark ? 'md:text-gray-500' : 'md:text-black'}`}
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <h5 className="font-semibold mb-5">
                <Link href="#" className="flex items-center">
                  Contact us
                </Link>
              </h5>
              <div className="space-y-3">
                <div>
                  <Link
                    href="#"
                    className={`flex items-center ${mode.dark ? 'md:text-gray-500' : 'md:text-black'}`}
                  >
                    <IconPhoneCall size={20} className='mr-5' />
                    +234 9155 577 731
                  </Link>
                </div>
                <div>
                  <Link
                    href="#"
                    className={`flex items-center ${mode.dark ? 'md:text-gray-500' : 'md:text-black'}`}
                  >
                    <IconMail size={20} className='mr-5' />
                    support@clan.africa
                  </Link>
                </div>
                <div>
                  <Link
                    href="#"
                    className={`flex items-center ${mode.dark ? 'md:text-gray-500' : 'md:text-black'}`}
                  >
                    <IconMapPin size={20} className='mr-5' />
                    77, Samuel Adedoyin street, Victoria Island, Lagos.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-200" />
        <div className="py-8">
          <div className="container max-w-7xl mx-auto flex-row sm:flex justify-between items-center">
            <div className="text-gray-500">
              © 2023{" "} |
              <Link href="#" className="hover:underline">
              {" "} Clan
              </Link>
              . All Rights Reserved.
            </div>
            <div className="flex mt-4 space-x-6 sm:mt-0">
              <Link href="#" target='_blank' className="text-gray-500 hover:text-gray-900">
                <IconBrandFacebook />
                <span className="sr-only">Facebook page</span>
              </Link>
              <Link href="#" target='_blank' className="text-gray-500 hover:text-gray-900">
                <IconBrandInstagram />
                <span className="sr-only">Instagram page</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <IconBrandTwitter />
                <span className="sr-only">Twitter page</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <div>
                  +2349155577731
                </div>
                {/* <IconBrandTwitter/> */}
                <span className="sr-only">Twitter page</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;
