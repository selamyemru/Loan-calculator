
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import useLoanStore from '../store';
import {
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateAnnualInterest,
  calculateAnnualPrincipal,
  calculateAnnualPayment,
} from '@/calculation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartData } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 12,
        },
        boxWidth: 10,
        boxHeight: 10,
        padding: 30,
      },
    },
    datalabels: {
      display: false,
      color: 'black',
      font: {
        size: 12,
      },
      formatter: (value: number) => value.toLocaleString(),
    },
  },
  elements: {
    bar: {
      borderRadius: 5,
    },
  },
};

const Chartbar = () => {
  const { loanTerm, interestRate, loanAmount, date, loanTermType } = useLoanStore();
  const [annualPayment, setAnnualPayment] = useState<number[]>([]);
  const [annualPrincipal, setAnnualPrincipal] = useState<number[]>([]);
  const [annualInterest, setAnnualInterest] = useState<number[]>([]);
  const [visibleData, setVisibleData] = useState({
    annualPayment: [] as number[],
    annualPrincipal: [] as number[],
    annualInterest: [] as number[],
  });

  useEffect(() => {
    const interest = calculateAnnualInterest(loanAmount, interestRate, loanTerm, loanTermType);
    const principal = calculateAnnualPrincipal(loanAmount, interestRate, loanTerm, loanTermType);
    const paymentPerYear = calculateAnnualPayment(loanAmount, interestRate, loanTerm, loanTermType);

    setAnnualPayment(paymentPerYear);
    setAnnualPrincipal(principal);
    setAnnualInterest(interest);
  }, [loanAmount, interestRate, loanTerm, loanTermType]);

  useEffect(() => {
    const updateVisibleData = () => {
      const width = window.innerWidth;
      let maxBars;

      if (width < 1440) {
        maxBars = 6;
      } else {
        maxBars = loanTermType === 'year' ? 6: 6;
      }

      setVisibleData({
        annualPayment: annualPayment.slice(0, maxBars),
        annualPrincipal: annualPrincipal.slice(0, maxBars),
        annualInterest: annualInterest.slice(0, maxBars),
      });
    };
    updateVisibleData();

    window.addEventListener('resize', updateVisibleData);
    return () => window.removeEventListener('resize', updateVisibleData);
  }, [annualPayment, annualPrincipal, annualInterest, loanTermType, loanTerm]);

  const yearLabels = Array.from(
    { length: visibleData.annualPayment.length },
    (_, i) => {
      const selectedYear = date ? new Date(date).getFullYear() + i : '';
      return selectedYear ? selectedYear.toString() : '';
    }
  );

  const monthLabels = Array.from(
    { length: visibleData.annualPayment.length },
    (_, i) => {
      if (date) {
        const selectedMonth = new Date(date).getMonth() + i + 1;
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
          new Date(new Date(date).setMonth(selectedMonth))
        );
        const selectedYear = new Date(date).getFullYear() + Math.floor((selectedMonth - 1) / 12);
        return `${monthName} ${selectedYear}`;
      } else {
        return '';
      }
    }
  );


  const data: ChartData<'bar' | 'line'> = {
    labels: loanTermType === 'year' ? yearLabels : monthLabels.slice(0, visibleData.annualPayment.length),
    datasets: [
      {
        label: loanTermType === 'year' ? 'Annual Payment' : 'Monthly Payment',
        data: visibleData.annualPayment.map((value) => Math.round(value)),
        backgroundColor: '#13213C',
        borderColor: '#FBA31B',
        type: 'bar',
        barPercentage: 0.85,
        categoryPercentage: 0.6,
      },
      {
        label: loanTermType === 'year' ? 'Annual Principal' : 'Monthly Principal',
        data: visibleData.annualPrincipal.map((value) => Math.round(value)),
        backgroundColor: '#FBA31B',
        borderColor: '#13213C',
        type: 'bar',
        barPercentage: 0.85,
        categoryPercentage: 0.6,
      },
      {
        label: loanTermType === 'year' ? 'Annual Interest' : 'Monthly Interest',
        data: visibleData.annualInterest.map((value) => Math.round(value)),
        backgroundColor: 'transparent',
        borderColor: '#c2c2c2',
        borderWidth: 2,
        type: 'line',
        pointStyle: 'circle',
        pointRadius: 3,
        pointBackgroundColor: '#242424',
        pointBorderColor: '#c2c2c2',
        pointBorderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex items-center">
      <div className="w-full lg:w-[80%] xl:w-[80%]">
        <Chart type="bar" options={options} data={data} height={500} width="w-full" />
      </div>
    </div>
  );
};

export default Chartbar;
