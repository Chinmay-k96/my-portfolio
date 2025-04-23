import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center gap-16 mt-8">
          {socialMedia.map((s) => (
            <a key={s.title} href={s.href} target="_blank" className="mb-3">
              <MagicButton
                title={s?.title}
                icon={s?.img}
                position="left"
                otherClasses="min-w-[200px]"
              />
            </a>
          ))}
        </div>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-center items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © {new Date().getFullYear()} Chinmay Kulkarni
        </p>
      </div>
    </footer>
  );
};

export default Footer;
