import { create } from 'zustand';

interface LoanState {
  loanAmount: number;
  loanTerm: number;
  loanTermType: string; 
  interestRate: number;
  date: Date | null;
  totalAmountPaid: number;
  monthlyPayment: number;
  principalAmount: number;
  interestAmount: number;
  loanAmountError: string;
  loanTermError: string;
  interestRateError: string;
  setLoanAmount: (amount: number) => void;
  setLoanTerm: (term: number) => void;
  setLoanTermType: (type: string) => void; 
  setInterestRate: (rate: number) => void;
  setDate: (date: Date | null) => void;
  setTotalAmountPaid: (amount: number) => void;
  setMonthlyPayment: (amount: number) => void;
  setPrincipalAmount: (amount: number) => void;
  setInterestAmount: (amount: number) => void;
  setLoanAmountError: (error: string) => void;
  setLoanTermError: (error: string) => void;
  setInterestRateError: (error: string) => void;
}
const initialState: LoanState = {
  loanAmount: 100000,
  loanTerm: 10,
  loanTermType: 'year',
  interestRate: 6,
  date: new Date(),
  totalAmountPaid: 133200,
  monthlyPayment: 1110,
  principalAmount: 100000,
  interestAmount: 33200,
  loanAmountError: '',
  loanTermError: '',
  interestRateError: '',
  setLoanAmount: function (amount: number): void {
    throw new Error('Function not implemented.');
  },
  setLoanTerm: function (term: number): void {
    throw new Error('Function not implemented.');
  },
  setLoanTermType: function (type: string): void {
    throw new Error('Function not implemented.');
  },
  setInterestRate: function (rate: number): void {
    throw new Error('Function not implemented.');
  },
  setDate: function (date: Date | null): void {
    throw new Error('Function not implemented.');
  },
  setTotalAmountPaid: function (amount: number): void {
    throw new Error('Function not implemented.');
  },
  setMonthlyPayment: function (amount: number): void {
    throw new Error('Function not implemented.');
  },
  setPrincipalAmount: function (amount: number): void {
    throw new Error('Function not implemented.');
  },
  setInterestAmount: function (amount: number): void {
    throw new Error('Function not implemented.');
  },
  setLoanAmountError: function (error: string): void {
    throw new Error('Function not implemented.');
  },
  setLoanTermError: function (error: string): void {
    throw new Error('Function not implemented.');
  },
  setInterestRateError: function (error: string): void {
    throw new Error('Function not implemented.');
  }
};

const useLoanStore = create<LoanState>((set) => ({
  ...initialState,
  setLoanAmount: (amount: number) => set((state) => ({ loanAmount: amount })),
  setLoanTerm: (term: number) => set((state) => ({ loanTerm: term })),
  setLoanTermType: (type: string) => set((state) => ({ loanTermType: type })), // Add setter
  setInterestRate: (rate: number) => set((state) => ({ interestRate: rate })),
  setDate: (date: Date | null) => set((state) => ({ date: date })),
  setTotalAmountPaid: (amount: number) => set((state) => ({ totalAmountPaid: amount })),
  setMonthlyPayment: (amount: number) => set((state) => ({ monthlyPayment: amount })),
  setPrincipalAmount: (amount: number) => set((state) => ({ principalAmount: amount })),
  setInterestAmount: (amount: number) => set((state) => ({ interestAmount: amount })),
  setLoanAmountError: (error: string) => set((state) => ({ loanAmountError: error })),
  setLoanTermError: (error: string) => set((state) => ({ loanTermError: error })),
  setInterestRateError: (error: string) => set((state) => ({ interestRateError: error })),
}));

export default useLoanStore;
