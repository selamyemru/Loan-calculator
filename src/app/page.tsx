"use client"
import InputFields from "../components/Inputfields";
import Pie from "../components/Piechart";
import { useState } from "react"
import Buttons from "@/components/Buttons";
import useLoanStore from '../store';
export default function Home() {
  const {
    totalAmountPaid,
    monthlyPayment,
    principalAmount,
    interestAmount,
  } = useLoanStore();
  const [chart, setChart] = useState(false)
  const showChart = () => {
    setChart(!chart)
  }
  const [schedule, setSchedule] = useState(false)
  const showSchedule = () => {
    setSchedule(!schedule)
  }
  return (
    <div className="ml-[5vw] ">
      <h1 className="text-2xl sm:text-2xl lg:text-4xl font-semibold mt-[2.5vw]">
        Loan <span className="text-[#FBA31B]">Calculator</span>
      </h1>
      <p className="mt-5 text-lg w-full">
        Setup your loan with the term you are happy with.The borrow can always
        make suggestions late.
      </p>
      <div className="bg-[#E8E9ED] bg-opacity-[32%] mr-[17vw] grid grid-cols-1 lg:grid-cols-2  mt-[3vw] pb-10">
        <div className="ml-[2vw] mt-[1vw]">
          <InputFields />
        </div>
        <div className="mt-[1vw] lg:mt-[3vw] mr-0 md:mr-[6vw]">
          <div className="flex flex-col ">
            <div className="  md:bg-[#E8E9ED]  md:bg-opacity-[32%] mb-5 px-16 pb-14  flex justify-center">
              <Pie />
            </div>
            <div className="flex flex-col justify-center bg-[#E8E9ED]  bg-opacity-[32%] items-center">
              <div className=" flex flex-col gap-1 py-5">
                You will Pay
                <div className="text-2xl text-bold">{monthlyPayment} <span>Br</span></div>
                <div className="text-[#FBA31B]">Per Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Buttons chart={chart} showChart={showChart} schedule={schedule} setSchedule={showSchedule}></Buttons>
    </div>
  );
}
