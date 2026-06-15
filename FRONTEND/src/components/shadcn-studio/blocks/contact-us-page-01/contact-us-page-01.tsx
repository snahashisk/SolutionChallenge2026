import RegisterForm from "@/components/shadcn-studio/blocks/register-01/register-form";

const ContactUs = () => {
  return (
    <section className="bg-muted py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-4 text-center sm:mb-16 lg:mb-24">
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">We&apos;re Here to Help</h2>
          <p className="text-muted-foreground text-xl">
            We at GoodDeed Foundation are always happy to help you. Whether you have a question, need support, or want
            to get involved, we&apos;re here to assist you.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img
            src="/image-17.jpg"
            alt="Contact illustration"
            className="size-full rounded-md object-cover max-lg:max-h-70"
          />

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="mb-2 text-2xl font-bold">Send us a message</h3>
            <p className="text-muted-foreground mb-10 text-base">
              Get in touch with us for any inquiries or support. <br />
              We&apos;re here to assist you and ensure your experience
            </p>

            {/* Contact Info Grid */}
            <div className="">
              <RegisterForm />
            </div>
            <p className="text-muted-foreground my-6 text-lg">
              I understand that my data will be hold securely in accordance with the{" "}
              <span className="underline font-bold text-primary">privacy policy</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
