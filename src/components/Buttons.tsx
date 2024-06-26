import React, { useState } from 'react';
import Schedule from './paymentSchedule';
import ChartBar from "../components/Bar";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ButtonsProps {
  chart: boolean;
  showChart: () => void;
  schedule: boolean;
  setSchedule: () => void;
}

function Buttons({ chart, showChart, schedule, setSchedule }: ButtonsProps) {
  const [showFirstDiv, setShowFirstDiv] = useState(true); // State to control the visibility of divs
  const [activeButton, setActiveButton] = useState('bar');

  const handleBarChartClick = () => {
    showChart(); // Ensure the chart display logic is still called
    setActiveButton('bar');
    setShowFirstDiv(false); // Hide the first-div and show the second-div
  };

  const handlePaymentScheduleClick = () => {
    setSchedule();
    setActiveButton('payment');
    setShowFirstDiv(false);
  };
  const downloadPDF = () => {
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('download.pdf');
    });
  };
  return (
    <div>
      {showFirstDiv ? (
        <div className="first-div flex flex-col gap-3 sm:flex-row justify-between items-baseline mr-[17vw] mb-12 mt-12">
          <button className="px-10 py-1 bg-white text-black rounded-lg border border-black font-semibold" onClick={downloadPDF}>
            Download
          </button>

          <button className="px-10 py-1 bg-[#13213C] text-white rounded-lg font-semibold" onClick={handleBarChartClick}>
            Bar chart
          </button>
        </div>
      ) : (
        <div className="second-div flex flex-col gap-5  md:flex-row md:justify-between md:items-baseline mr-[17vw] mt-12">
          <p className="text-[#13213C] text-xl">You can switch to see payment schedule</p>
          <div className=" pl-0 py-2 w-fit text-black rounded-3xl sm:bg-[#F1F2F4] h-8 flex flex-col gap-3 sm:flex-row sm:gap-2 items-center">
            <button
              className={`px-10 py-1 text-[#13213C] rounded-3xl font-semibold ${activeButton === 'bar' ? 'bg-[#13213C] text-white' : 'bg-[#F1F2F4] text-[#13213C]'}`}
              onClick={handleBarChartClick}
            >
              Bar chart
            </button>
            
            <button
              className={`px-4 sm:px-10 py-1 w-fit font-semibold rounded-3xl sm:bg-none ${activeButton === 'payment' ? 'bg-[#13213C] text-white' : 'bg-[#F1F2F4] text-[#13213C]'}`}
              onClick={handlePaymentScheduleClick}
            >
              Payment Schedule
            </button>
          </div>
        </div>
      )}
      <div className="pdf-content"> {/* Container for the content to be captured */}
        {!showFirstDiv && (
          <>
            <div className="div-a mt-[10vh] ml-[4vw]">
              {activeButton === 'bar' && <ChartBar />}
            </div>
            <div className="div-b mt-[10vh] ml-[4vw]">
              {activeButton === 'payment' && <Schedule  />}
              
              {(activeButton === 'bar' || activeButton === 'payment') && ( // Render download button if either bar chart or payment schedule is active
              <div className="flex justify-between mr-[17vw] mb-5 mt-2">
                <button className="px-10 py-1 bg-white text-black rounded-lg borderfont-semibold" onClick={downloadPDF}>
                
                </button>
                <button className="px-10 py-1 bg-white text-black rounded-lg border border-black font-semibold" onClick={downloadPDF}>
                  Download
                </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Buttons;
