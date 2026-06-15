import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const dashboardFooter = () => {
  return (
    <footer className="text-muted-foreground flex items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6 md:max-lg:flex-col">
      <p className="text-center text-sm text-balance">
        {`©${new Date().getFullYear()}`}{" "}
        <a href="#" className="text-primary">
          GoodDeed Foundation
        </a>
        , Made for a better society
      </p>
      <div className="flex items-center gap-5">
        <a href="#">
          <FaFacebookF className="size-4" />
        </a>
        <a href="#">
          <FaInstagram className="size-4" />
        </a>
        <a href="#">
          <FaLinkedinIn className="size-4" />
        </a>
        <a href="#">
          <FaTwitter className="size-4" />
        </a>
      </div>
    </footer>
  );
};

export default dashboardFooter;
