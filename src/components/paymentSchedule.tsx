import React from 'react';
import useLoanStore from '@/store';
import { calculateAmortizationSchedule, calculateAnnualInterest, calculateAnnualPrincipal, calculateAnnualPayment } from '@/calculation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload } from 'react-icons/fa';
const Schedule: React.FC = () => {
  const { loanAmount, interestRate, loanTerm, loanTermType ,date} = useLoanStore();
  const amortizationSchedule = calculateAmortizationSchedule(loanAmount, interestRate, loanTerm,loanTermType, date);
  const annualInterest = calculateAnnualInterest(loanAmount, interestRate, loanTerm,loanTermType);
  const annualPrincipal = calculateAnnualPrincipal(loanAmount, interestRate, loanTerm,loanTermType);
  const annualPayment = calculateAnnualPayment(loanAmount, interestRate, loanTerm,loanTermType);

  const paymentDates = amortizationSchedule.map((payment, index) => {
    if (payment.date) {
      const paymentDate = new Date(payment.date);
      paymentDate.setMonth(paymentDate.getMonth() + index + 1);
      return paymentDate.toLocaleDateString();
    } else {
      return '-';
    }
  });

  const groupByYear = () => {
    const grouped: { [key: number]: any[] } = {};
    amortizationSchedule.forEach((payment, index) => {
      const year = Math.ceil((index + 1) / 12);
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push({ ...payment, paymentDate: paymentDates[index] });
    });
    return grouped;
  };

  const groupedByYear = groupByYear();

  const downloadPDF = () => {
    const input = document.getElementById('schedule-content');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        let position = 0;
  
        canvas.height = pdfHeight; // Set canvas height to match PDF page height
        const totalPages = Math.ceil(canvas.height / pdf.internal.pageSize.getHeight());
  
        for (let i = 0; i < totalPages; i++) {
          if (i > 0) {
            pdf.addPage(); // Add new page for each additional content
            position -= pdf.internal.pageSize.getHeight();
          }
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        }
  
        pdf.save('schedule.pdf');
      });
    }
  };
  

  return (
    <div className="mr-[17vw] mb-6 -ml-[5vw] bg-[#E8E9ED] bg-opacity-[32%] p-8 overflow-y-scroll" style={{ maxHeight: 'calc(130vh - 20rem)' }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-[#13213C] mb-1 text-center">Payment Schedule</h1>
        <button className="px-4 py-2 f" onClick={downloadPDF}>
          <FaDownload className="mr-2" />
        </button>
      </div>
      <div id="schedule-content"> {/* Wrap the content to capture inside this div */}
        {Object.keys(groupedByYear).map((year, index) => (
          <div key={index} className="mt-5">
            <h2 className="text-lg font-semibold mb-3 text-[#13213C]">{`Year ${year}`}</h2>
            <table className="w-full border-collapse divide-y divide-gray-200">
              <thead>
                <tr className="bg-[#13213C] font-semibold">
                  <th className="px-4 py-2 text-left font-medium text-white">Payment Date</th>
                  <th className="px-4 py-2 text-left font-medium text-white">Principal Paid</th>
                  <th className="px-4 py-2 text-left font-medium text-white">Interest Paid</th>
                  <th className="px-4 py-2 text-left font-medium text-white">Total Payment</th>
                  <th className="px-4 py-2 text-left font-medium text-white">Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                {groupedByYear[parseInt(year)].map((payment, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-4 text-left text-sm font-normal text-gray-700">{payment.paymentDate}</td>
                    <td className="px-4 py-4 text-left text-sm font-normal text-gray-700">{payment.principalPaid}</td>
                    <td className="px-4 py-4 text-left text-sm font-normal text-gray-700">{payment.interestPaid}</td>
                    <td className="px-4 py-4 text-left text-sm font-normal text-gray-700">{payment.monthlyPayment}</td>
                    <td className="px-4 py-4 text-left text-sm font-normal text-gray-700">{payment.remainingPrincipal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
