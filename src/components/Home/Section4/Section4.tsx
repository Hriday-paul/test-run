import { GoArrowUpRight } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Title from "./Title";

type planType = {
  level: string;
  duration: string;
  price: string;
  features: string[];
};

const plans: planType[] = [
  {
    level: "Silver",
    duration: "3 Month",
    price: "$300",
    features: [
      "3 Regular Ads",
      "1 Featured Ads",
      "1 Top Ads",
      "1 Ads will be bumped up",
      "Basic Support",
    ],
  },
  {
    level: "Gold",
    duration: "6 Month",
    price: "$500",
    features: [
      "5 Regular Ads",
      "2 Featured Ads",
      "3 Top Ads",
      "3 Ads will be bumped up",
      "Basic Support",
    ],
  },
  {
    level: "Platinum",
    duration: "12 Month",
    price: "$900",
    features: [
      "10 Regular Ads",
      "5 Featured Ads",
      "5 Top Ads",
      "5 Ads will be bumped up",
      "Priority Support",
    ],
  },
];

export default function Section4() {
  return (
    <section className="py-16 bg-[#F5F7FA]">
      <div className="container">
        
        <Title />

        <div className="flex flex-col items-center space-y-3">
          <Button className="bg-transparent border rounded-full border-black hover:border-primary px-6 hover:bg-transparent text-black transition-all duration-200">
            Pricing
          </Button>
          <p className="font-semibold text-[#060517]">Flexible Pricing Plan</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 my-15">
          {plans.map((plan, index) => {
            const isMiddle = index === 1;
            return (
              <div
                key={plan.level}
                className={`
                  relative flex flex-col p-8 overflow-hidden rounded-2xl shadow-sm border border-gray-200 transition-all duration-1000
                  ${
                    isMiddle
                      ? "lg:scale-y-110 bg-primary text-white"
                      : "group text-black bg-white"
                  }
                `}
              >
                {/* Background animation */}
                {!isMiddle && (
                  <div className="absolute inset-0 bg-primary translate-y-120 group-hover:translate-y-0 transition-transform duration-1000 ease-out rounded-2xl"></div>
                )}

                <div
                  className={`flex justify-between items-center relative z-10 ${
                    !isMiddle ? "group-hover:text-white" : ""
                  }`}
                >
                  <h5>{plan.level}</h5>
                  <p>{plan.duration}</p>
                </div>

                <div
                  className={`relative z-10 text-nowrap ${
                    !isMiddle ? "group-hover:text-white" : ""
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <p className=" mb-6">
                      <span className="text-4xl font-bold group-hover:text-white">
                        {plan.price}
                      </span>
                    </p>

                    <ul
                      className={`mb-8 space-y-2 ${
                        !isMiddle ? "group-hover:text-white" : ""
                      }`}
                    >
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <IoMdCheckmarkCircleOutline />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Button
                  className={`
                    relative z-20 mt-auto px-6 rounded-full font-medium  transition-all duration-1000 ease-out transform flex justify-between border border-primary py-6 bg-white text-primary hover:scale-x-105 cursor-pointer 
                    ${
                      isMiddle
                        ? "bg-transparent border-white text-white"
                        : "hover:bg-white"
                    }
                  `}
                >
                  <span>Choose {plan.level}</span>
                  <span
                    className={`p-2 border rounded-full ${
                      isMiddle ? "border-white" : "border-primary "
                    }`}
                  >
                    <GoArrowUpRight />
                  </span>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
