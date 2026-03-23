import Button from './global/Button';

const ContactUs = () => {
  return (
    <div>
      <section class="bg-white dark:bg-gray-200">
        <div class="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
          <h2 class="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900">
            Contact Us
          </h2>
          <p class="mb-8 text-center font-light text-gray-700 dark:text-gray-400 sm:text-xl lg:mb-16">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form action="#" class="space-y-8">
            <div>
              <label
                for="email"
                class="mb-2 block text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <label
                for="subject"
                class="mb-2 block text-sm font-medium text-gray-900"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="mb-2 block text-sm font-medium text-gray-900"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <Button className="text-white">Send Message</Button>
            {/* <button type="submit" class="py-3 px-5 text-sm font-medium text-center rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300">Send message</button> */}
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
