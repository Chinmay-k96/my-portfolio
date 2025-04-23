"use client";
import MagicButton from "./MagicButton";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const openPDFInNewWindow = () => {
  const pdfUrl = "/Full_Stack_Developer_React_Node_Senior_SDE.pdf"; // This should be a public URL or path to the PDF

  const newWindow = window.open("", "_blank", "width=800,height=600");

  if (newWindow) {
    newWindow.document.write(`
      <html>
        <head><title>PDF Viewer</title></head>
        <body style="margin:0;padding:0;">
          <iframe src="${pdfUrl}" style="width:100%;height:100%;" frameborder="0"></iframe>
        </body>
      </html>
    `);
  }
};

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // chnage the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex relative z-10">
        <div className="flex w-full">
          <div className="px-20">
            <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shadow-profile">
              <img
                src="/profile.jpg"
                alt="profile picture"
                className="profile"
              />
            </div>
          </div>
          <div className="px-10 mt-10">
            <TextGenerateEffect
              words="Hi! I am Chinmay, a Full Stack Developer based in India."
              className="text-center text-[20px] md:text-2xl lg:text-4xl"
            />
            <TextGenerateEffect
              words="I specialize in Transforming Concepts into Seamless User Experiences"
              className="text-center md:tracking-wider mb-4 text-sm md:text-base lg:text-lg"
              changeColor={false}
            />
            <div className="w-[180px] mt-10 mx-auto">
              <MagicButton
                title={"My Resume"}
                icon={"/resume.svg"}
                position="left"
                handleClick={openPDFInNewWindow}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
