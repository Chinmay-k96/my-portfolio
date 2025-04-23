import { rewards } from "@/data";
import { PinContainer } from "./ui/Pin";

const Rewards = () => {
  return (
    <section className="py-10" id="rewards">
      <h1 className="heading pb-6">
        Rewards & <span className="text-purple">Recognition</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {rewards.map((item) => (
          <div
            className="flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer title="Pwc">
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden mb-8">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                <img
                  src={item.img}
                  alt="cover"
                  className="z-10 w-full h-full object-cover"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>

              <p
                className="lg:text-sm lg:font-normal font-light text-xs line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>
            </PinContainer>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rewards;
