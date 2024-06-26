// 'use client'
// import { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import useLoanStore from '../store';
// import {
//   calculateMonthlyPayment,
//   calculateTotalAmountPaid,
//   calculateTotalInterest,
// } from '../calculation';
// import React, { ChangeEvent, FormEvent } from 'react';
// const InputFields: React.FC = (props: any) => {
//   const [dateState, setDateState] = useState<Date | null>(null);
//   const {
//     loanAmount,
//     loanTerm,
//     interestRate,
//     date,
//     totalAmountPaid,
//     monthlyPayment,
//     principalAmount,
//     interestAmount,
//     loanAmountError,
//     loanTermError,
//     interestRateError,
//     loanTermType,
//     setLoanAmount,
//     setLoanTerm,
//     setLoanTermType,
//     setInterestRate,
//     setDate,
//     setTotalAmountPaid,
//     setMonthlyPayment,
//     setPrincipalAmount,
//     setInterestAmount,
//     setLoanAmountError,
//     setLoanTermError,
//     setInterestRateError,
//   } = useLoanStore();

//   const validate = (): boolean => {
//     let isValid = true;
//     if (loanAmount <= 0 || isNaN(loanAmount)) {
//       setLoanAmountError('Loan amount must be a positive number');
//       isValid = false;
//     } else {
//       setLoanAmountError('');
//     }

//     if (loanTerm <= 0 || isNaN(loanTerm)) {
//       setLoanTermError('Loan term must be a positive number');
//       isValid = false;
//     } else {
//       setLoanTermError('');
//     }

//     if (interestRate <= 0 || isNaN(interestRate)) {
//       setInterestRateError('Interest rate must be a positive number');
//       isValid = false;
//     } else {
//       setInterestRateError('');
//     }
//     return isValid;
//   };

//   const handleCalculate = (event: FormEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     if (validate()) {
//       const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm, loanTermType);
//       const interestAmount = calculateTotalInterest(monthlyPayment, loanTerm, loanAmount, loanTermType);
//       const totalAmountPaid = calculateTotalAmountPaid(interestAmount, loanAmount);

//       setPrincipalAmount(loanAmount);
//       setMonthlyPayment(monthlyPayment);
//       setInterestAmount(interestAmount);
//       setTotalAmountPaid(totalAmountPaid);
//     }
//   };
//   const handleReset = (event: FormEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     if (validate()) {
//       setLoanAmount(100000);
//       setLoanTerm(10);
//       setInterestRate(6);
//       setDate(new Date());
//       const monthlyPayment = calculateMonthlyPayment(100000, 6, 10, "year");
//       const interestAmount = calculateTotalInterest(monthlyPayment, 10, 100000, "year");
//       const totalAmountPaid = calculateTotalAmountPaid(interestAmount, 100000);
//       setPrincipalAmount(100000);
//       setMonthlyPayment(monthlyPayment);
//       setInterestAmount(interestAmount);
//       setTotalAmountPaid(totalAmountPaid);
//     }
//   };

//   const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = event.target;
//     switch (name) {
//       case 'loanAmount':
//         setLoanAmount(parseFloat(value));
//         break;
//       case 'loanTerm':
//         setLoanTerm(parseInt(value));
//         break;
//       case 'interestRate':
//         setInterestRate(parseFloat(value));
//         break;
//       case 'date':
//         setDate(dateState);
//         break;
//       default:
//         break;
//     }
//   };
//   const handleDateChange = (newDate: Date | null) => {
//     setDateState((prevState) => newDate);
//     setDate(newDate)
//   };
//   const handleTermTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const termType = event.target.value as 'year' | 'month';
//     setLoanTermType(termType);
//     console.log(termType);
//   };

//   return (
//     <div className="">
//       <div className=" flex gap-32 items-center pl-[3vw] py-[2vw] mt-14 rounded-sm ">
//         <form className="flex flex-col gap-3">
//           <div className="flex flex-col gap-2 pb-[1.2vw]">
//             <label htmlFor="loanAmount" className="pb-[0.8vw]">Enter loan amount</label>
//             <input
//               type="number"
//               id="loanAmount"
//               name="loanAmount"
//               value={loanAmount || ''}
//               onChange={handleChange}
//               placeholder="Enter loan amount"
//               className="h-11 lg:w-[28vw] w-[50vw] rounded-lg pl-5 outline-none text-gray-500 "
//             />
//             {loanAmountError && <p className="text-red-500">{loanAmountError}</p>}
//           </div>

//           <div >
//             <div className="flex flex-col gap-2 pb-[1.2vw]">
//               <label htmlFor="interestRate" className='pb-[0.8vw]'>Enter Annual interest</label>
//               <input
//                 type="number"
//                 id="interestRate"
//                 name="interestRate"
//                 value={interestRate || ''}
//                 onChange={handleChange}
//                 placeholder="Enter interest rate"
//                 className="h-11 lg:w-[28vw] w-[50vw] rounded-lg pl-5 outline-none  text-gray-500"
//               />
//               {interestRateError && <p className="text-red-500">{interestRateError}</p>}
//             </div>

//           </div>
//           <div className=" flex items-center justify-between gap-10 pb-[1.2vw] ">
//             <div className="flex flex-col gap-2">
//               {/* <label htmlFor="loanTerm" className=' pb-[0.8vw] '>Enter loan term</label> */}
//               <label htmlFor="loanTerm" className="pb-[0.8vw]">Enter loan term</label>

//               <input
//                 type="number"
//                 id="loanTerm"
//                 name="loanTerm"
//                 value={loanTerm || ''}
//                 onChange={handleChange}
//                 placeholder="Enter loan term"
//                 className="h-11 w-[13vw] sm:w-[27vw] md:w-[30vw] lg:w-[14vw] rounded-lg pl-5 outline-none text-gray-500"
//               />
//               {loanTermError && <p className="text-red-500">{loanTermError}</p>}
//             </div>
//             <div className="flex gap-6 mr-[3vw]">
//               <div className="mt-10 flex gap-2 items-center">
//                 <input
//                   type="radio"
//                   id="termYear"
//                   name="termType"
//                   value="year"
//                   checked={loanTermType === 'year'}
//                   onChange={handleTermTypeChange}
//                   className="appearance-none w-3 h-3 rounded-full 
//   border-2 border-gray-400 outline-none cursor-pointer transition-colors 
//   duration-300 checked:border-[#13213C] checked:bg-[#13213C] checked:after:content-[''] 
//   checked:after:block checked:after:w-2 checked:after:h-2 checked:after:rounded-full
//    checked:after:bg-white checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
//                 />

//                 <label htmlFor="termYear">Year</label>
//               </div>
//               <div className="mt-10 flex gap-2 items-center">

//                 <input
//                   type="radio"
//                   id="termMonth"
//                   name="termType"
//                   value="month"
//                   checked={loanTermType === 'month'}
//                   onChange={handleTermTypeChange}
//                   className="appearance-none w-3 h-3 rounded-full border-2 border-gray-400 outline-none cursor-pointer transition-colors duration-300 checked:border-[#13213C] checked:bg-[#13213C] checked:after:content-[''] checked:after:block checked:after:w-2 checked:after:h-2 checked:after:rounded-full checked:after:bg-white checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
//                 />

//                 <label htmlFor="termMonth">Month</label>
//               </div>
//             </div>

//           </div>
//           <div className="flex flex-col gap-2 pb-[0.8vw] ">
//             <label htmlFor="loanType" className='pb-[0.8vw]'>Select Date</label>
//             <DatePicker
//               selected={dateState}
//               onChange={handleDateChange}
//               dateFormat="MM/dd/yyyy"
//               placeholderText={date ? date.toLocaleDateString() : ''}
//               className="h-11 lg:w-[28vw] w-[50vw] rounded-lg pl-5 outline-none text-gray-600"
//             />
//           </div>
//           <div className="flex justify-between mt-5 mr-[2.7vw]">
//             <button
//               className="bg-[#13213C] text-white px-8 rounded-md py-1"
//               onClick={handleCalculate}
//             >
//               Calculate
//             </button>
//             <button
//               type="button"
//               className="border border-black border-opacity-30 rounded-md px-5 bg-white py-1"
//               onClick={handleReset}
//             >
//               Reset
//             </button>
//           </div>
//         </form>
//         <div className="bg-[#E8E9ED] flex flex-col gap-10"></div>
//       </div>
//     </div>
//   );
// };
// export default InputFields;
// function setDateState(arg0: null) {
//   throw new Error('Function not implemented.');
// }

'use client'
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useLoanStore from '../store';
import {
  calculateMonthlyPayment,
  calculateTotalAmountPaid,
  calculateTotalInterest,
} from '../calculation';
import React, { ChangeEvent, FormEvent } from 'react';

const InputFields: React.FC = () => {
  const [dateState, setDateState] = useState<Date | null>(null);
  const {
    loanAmount,
    loanTerm,
    interestRate,
    date,
    totalAmountPaid,
    monthlyPayment,
    principalAmount,
    interestAmount,
    loanAmountError,
    loanTermError,
    interestRateError,
    loanTermType,
    setLoanAmount,
    setLoanTerm,
    setLoanTermType,
    setInterestRate,
    setDate,
    setTotalAmountPaid,
    setMonthlyPayment,
    setPrincipalAmount,
    setInterestAmount,
    setLoanAmountError,
    setLoanTermError,
    setInterestRateError,
  } = useLoanStore();

  const validateLoanAmount = (value: number): boolean => {
    if (value <= 0 || isNaN(value)) {
      setLoanAmountError('Loan amount must be a positive number');
      return false;
    } else {
      setLoanAmountError('');
      return true;
    }
  };

  const validateLoanTerm = (value: number): boolean => {
    if (value <= 0 || isNaN(value)) {
      setLoanTermError('Loan term must be a positive number');
      return false;
    } else {
      setLoanTermError('');
      return true;
    }
  };

  const validateInterestRate = (value: number): boolean => {
    if (value <= 0 || isNaN(value)) {
      setInterestRateError('Interest rate must be a positive number');
      return false;
    } else {
      setInterestRateError('');
      return true;
    }
  };

  const validate = (): boolean => {
    const isLoanAmountValid = validateLoanAmount(loanAmount);
    const isLoanTermValid = validateLoanTerm(loanTerm);
    const isInterestRateValid = validateInterestRate(interestRate);

    return isLoanAmountValid && isLoanTermValid && isInterestRateValid;
  };

  const handleCalculate = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (validate()) {
      const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm, loanTermType);
      const interestAmount = calculateTotalInterest(monthlyPayment, loanTerm, loanAmount, loanTermType);
      const totalAmountPaid = calculateTotalAmountPaid(interestAmount, loanAmount);

      setPrincipalAmount(loanAmount);
      setMonthlyPayment(monthlyPayment);
      setInterestAmount(interestAmount);
      setTotalAmountPaid(totalAmountPaid);
    }
  };

  const handleReset = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoanAmount(100000);
    setLoanTerm(10);
    setInterestRate(6);
    setDate(new Date());
    setDateState(new Date());
    const monthlyPayment = calculateMonthlyPayment(100000, 6, 10, "year");
    const interestAmount = calculateTotalInterest(monthlyPayment, 10, 100000, "year");
    const totalAmountPaid = calculateTotalAmountPaid(interestAmount, 100000);
    setPrincipalAmount(100000);
    setMonthlyPayment(monthlyPayment);
    setInterestAmount(interestAmount);
    setTotalAmountPaid(totalAmountPaid);
    setLoanAmountError('');
    setLoanTermError('');
    setInterestRateError('');
  };

  // const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = event.target;
  //   switch (name) {
  //     case 'loanAmount':
  //       const loanAmountValue = parseFloat(value);
  //       setLoanAmount(loanAmountValue);
  //       validateLoanAmount(loanAmountValue);
  //       break;
  //     case 'loanTerm':
  //       const loanTermValue = parseInt(value);
  //       setLoanTerm(loanTermValue);
  //       validateLoanTerm(loanTermValue);
  //       break;
  //     case 'interestRate':
  //       const interestRateValue = parseFloat(value);
  //       setInterestRate(interestRateValue);
  //       validateInterestRate(interestRateValue);
  //       break;
  //     default:
  //       break;
  //   }
  // };
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'loanAmount':
        const loanAmountValue = parseFloat(value);
        setLoanAmount(loanAmountValue);
        validateLoanAmount(loanAmountValue);
        break;
      case 'loanTerm':
        const loanTermValue = parseInt(value);
        setLoanTerm(loanTermValue);
        if (loanTermType === 'year' ) {
          validateLoanTerm(loanTermValue);
        } else if (loanTermType === 'month') {
          validateLoanTerm(loanTermValue / 12); // Convert months to years for validation
        }  
        break;
      case 'interestRate':
        const interestRateValue = parseFloat(value);
        setInterestRate(interestRateValue);
        validateInterestRate(interestRateValue);
        break;
      default:
        break;
    }
  };
  
  const handleDateChange = (newDate: Date | null) => {
    setDateState(newDate);
    setDate(newDate);
  };

  const handleTermTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const termType = event.target.value as 'year' | 'month';
    setLoanTermType(termType);
    console.log(termType);
  };

  return (
    <div className="">
      <div className=" flex gap-32 items-center pl-[3vw] py-[2vw] mt-14 rounded-sm ">
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 pb-[1.2vw]">
            <label htmlFor="loanAmount" className="pb-[0.8vw]">Enter loan amount</label>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              value={loanAmount || ''}
              onChange={(event)=>handleChange(event)}
              placeholder="Enter loan amount"
              className="h-11 lg:w-[28vw] w-[50vw] rounded-lg pl-5 outline-none text-gray-500 "
            />
            {loanAmountError && <p className="text-red-500">{loanAmountError}</p>}
          </div>

          <div>
            <div className="flex flex-col gap-2 pb-[1.2vw]">
              <label htmlFor="interestRate" className='pb-[0.8vw]'>Enter Annual interest</label>
              <input
                type="number"
                id="interestRate"
                name="interestRate"
                value={interestRate || ''}
                onChange={handleChange}
                placeholder="Enter interest rate"
                className="h-11 lg:w-[28vw] w-[50vw] rounded-lg pl-5 outline-none  text-gray-500"
              />
              {interestRateError && <p className="text-red-500">{interestRateError}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between gap-10 pb-[1.2vw]">
            <div className="flex flex-col gap-2">
              <label htmlFor="loanTerm" className="pb-[0.8vw]">Enter loan term</label>
              <input
                type="number"
                id="loanTerm"
                name="loanTerm"
                value={loanTerm || ''}
                onChange={handleChange}
                placeholder="Enter loan term"
                className="h-11 w-[13vw] sm:w-[27vw] md:w-[30vw] lg:w-[14vw] rounded-lg pl-5 outline-none text-gray-500"
              />
              {loanTermError && <p className="text-red-500">{loanTermError}</p>}
            </div>
            <div className="flex gap-6 mr-[3vw]">
              <div className="mt-10 flex gap-2 items-center">
                <input
                  type="radio"
                  id="termYear"
                  name="termType"
                  value="year"
                  checked={loanTermType === 'year'}
                  onChange={handleTermTypeChange}
                  className="appearance-none w-3 h-3 rounded-full 
  border-2 border-gray-400 outline-none cursor-pointer transition-colors 
  duration-300 checked:border-[#13213C] checked:bg-[#13213C] checked:after:content-[''] 
  checked:after:block checked:after:w-2 checked:after:h-2 checked:after:rounded-full
   checked:after:bg-white checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                />
                <label htmlFor="termYear">Year</label>
              </div>
              <div className="mt-10 flex gap-2 items-center">
                <input
                  type="radio"
                  id="termMonth"
                  name="termType"
                  value="month"
                  checked={loanTermType === 'month'}
                  onChange={handleTermTypeChange}
                  className="appearance-none w-3 h-3 rounded-full border-2 border-gray-400 outline-none cursor-pointer transition-colors duration-300 checked:border-[#13213C] checked:bg-[#13213C] checked:after:content-[''] checked:after:block checked:after:w-2 checked:after:h-2 checked:after:rounded-full checked:after:bg-white checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                />
                <label htmlFor="termMonth">Month</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pb-[0.8vw]">
            <label htmlFor="loanType" className='pb-[0.8vw]'>Select Date</label>
            <DatePicker
              selected={dateState}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              placeholderText={date ? date.toLocaleDateString() : ''}
              className="h-11 lg:w-[28vw] w-[50vw] rounded-lg pl-5 outline-none text-gray-600"
            />
          </div>

          <div className="flex justify-between mt-5 mr-[2.7vw]">
            <button
              className="bg-[#13213C] text-white px-8 rounded-md py-1"
              onClick={handleCalculate}
            >
              Calculate
            </button>
            <button
              type="button"
              className="border border-black border-opacity-30 rounded-md px-5 bg-white py-1"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
        <div className="bg-[#E8E9ED] flex flex-col gap-10"></div>
      </div>
    </div>
  );
};

export default InputFields;
