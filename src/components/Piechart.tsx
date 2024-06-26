'use client';

import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  ChartOptions,
  ChartType,
  Plugin,
  Chart
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useLoanStore from '../store';

ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController, ChartDataLabels);

// Define the custom plugin options interface
interface CenterTextPluginOptions {
  text: string;
  color: string;
}

// Extend the Chart.js options to include the custom plugin
declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    centerText?: CenterTextPluginOptions;
  }
}

// Custom plugin to draw blurred background behind data labels
const blurredBackgroundPlugin: Plugin<'doughnut'> = {
  id: 'blurredBackground',
  beforeDatasetsDraw: (chart, args, options) => {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0); // Get the first (and only) dataset

    meta.data.forEach((point) => {
      const { x, y, radius } = point.getProps(['x', 'y', 'radius'], true);

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius + 8, 0, 2 * Math.PI); // Increase the radius to create a larger background
      ctx.fillStyle = 'rgba(217, 217, 217, 0.45)'; // Set the background color
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius + 8, 0, 2 * Math.PI);
      ctx.clip();
      ctx.filter = 'blur(500px)'; // Apply the blur effect
      ctx.fill();
      ctx.restore();
    });
  },
};

export default function Pie() {
  const {
    totalAmountPaid,
    principalAmount,
    interestAmount,
  } = useLoanStore();

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const customLegendRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartContainer = chartContainerRef.current;

      const centerTextPlugin: Plugin<'doughnut'> = {
        id: 'centerText',
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Calculate font size based on chart width
          const chartWidth = chart.width;
          const totalFontSize = Math.max(Math.min(chartWidth / 10, 16), 16); // Increase the minimum font size for "Total" text
          const amountFontSize = Math.max(Math.min(chartWidth / 12, 16), 14); // Increase the minimum font size for total amount text
          // Draw the "Total" text
          const totalText = 'Total';
          ctx.font = `${totalFontSize}px sans-serif`;
          ctx.fillStyle = chart.options.plugins?.centerText?.color || 'black';
          ctx.fillText(totalText, centerX, centerY - amountFontSize * 0.4);

          // Draw the total amount paid text
          const amountText = `$${totalAmountPaid.toLocaleString()}`;
          ctx.font = `${amountFontSize}px sans-serif`;
          ctx.fillStyle = chart.options.plugins?.centerText?.color || 'black';
          ctx.fillText(amountText, centerX, centerY + amountFontSize * 1.2);

          ctx.restore();
        },
      };

      // Calculate percentages
      const total = principalAmount + interestAmount;
      const principalPercentage = (principalAmount / total) * 100;
      const interestPercentage = (interestAmount / total) * 100;

      const chart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Total Principal', 'Total Interest'],
          datasets: [
            {
              label: 'Loan Breakdown',
              data: [principalPercentage, interestPercentage],
              backgroundColor: ['rgba(19,33,60)', 'rgb(250,180,70)'],
              borderColor: ['rgba(19,33,60, 0.1)', 'rgb(250,180,70,1)'],
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        },
        options: {
          animation: {
            duration: 3000,
          },
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false, // Disable the default legend
            },
            tooltip: {
              enabled: false,
            },
            datalabels: {
              display: true,
              color: (context) => {
                // Change color based on the data index
                return context.dataIndex === 0 ? 'white' : 'black';
              },
              font: {
                size: 14,
                weight: 'bold',
              },
              padding: {
                top: 8,
                right: 12,
                bottom: 8,
                left: 12,
              },
              backgroundColor: 'rgba(217,217,217, 0.5)',
              borderRadius: 5,
              formatter: (value, context) => {
                return `${value.toFixed(2)}%`;
              },
            },
            centerText: {
              text: 'Total',
              color: 'black',
            },
          },
          cutout: '65%',
          radius: '78%',
          rotation: 110,
          layout: {
            padding: {
              top: 0,
              bottom:14,
            },
          },
        } as ChartOptions<'doughnut'>,
        plugins: [centerTextPlugin, blurredBackgroundPlugin],
      });

      // Custom legend
      const customLegend = customLegendRef.current;
      if (customLegend) {
        const legendHtml = `
        <div style="display: flex; justify-content: space-around; margin-top: -2vw; padding:5px;"> <!-- Adjusted margin-top to use vw -->
        <div style="text-align: center; display: flex; ">
          <span style="margin-top:6px; width: 10px; height: 10px; background-color: #13213C; border-radius: 50%; margin-right: 8px;"></span>
          <div>
            <span style="font-size:15px;">Total Principal</span>
            <br />
            <span style="font-size:15px;">$${principalAmount.toLocaleString()}</span>
          </div>
        </div>

        <div style="text-align: center; display: flex; ">
          <span style="margin-top:6px; width: 10px; height: 10px; background-color: #FBA31B; border-radius: 50%; margin-right: 8px;"></span>
          <div>
            <span style="font-size:15px;">Total Principal</span>
            <br />
            <span style="font-size:15px;">$${interestAmount.toLocaleString()}</span>
          </div>
        </div>

       
      </div>
        `;
        customLegend.innerHTML = legendHtml;
      }

      const resizeChart = () => {
        chart.resize();
      };

      window.addEventListener('resize', resizeChart);

      return () => {
        window.removeEventListener('resize', resizeChart);
        chart.destroy();
      };
    }
  }, [totalAmountPaid, principalAmount, interestAmount]);

  return (
    <div ref={chartContainerRef} style={{ width: '100%', height: '380px' }}>
      <canvas ref={chartRef} />
      <div ref={customLegendRef} />
    </div>
  );
}
