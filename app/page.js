"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Toggle from "./tumbler";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Oscillations = () => {
  const [A, setA] = useState(100); // Амплитуда X
  const [B, setB] = useState(100); // Амплитуда Y
  const [alpha, setAlpha] = useState(Math.PI); // Разность фаз
  const [frequencyRatio, setFrequencyRatio] = useState(2); // Соотношение частот w2/w1
  const [isAutoRotate, setIsAutoRotate] = useState(true); // Автоматическое вращение

  useEffect(() => {
    let rotationInterval;
    if (isAutoRotate) {
      rotationInterval = setInterval(() => {
        setAlpha((prevAlpha) => prevAlpha + 0.02); // Плавное увеличение разности фаз
      }, 50);
    } else if (rotationInterval) {
      clearInterval(rotationInterval);
    }
    return () => clearInterval(rotationInterval);
  }, [isAutoRotate]);

  const generateOscillationData = () => {
    const points = [];
    const step = 0.01;
    for (let t = 0; t <= 2 * Math.PI; t += step) {
      const x = A * Math.cos(t);
      const y = B * Math.cos(frequencyRatio * t + alpha);
      points.push({ x, y });
    }
    return points;
  };

  const oscillationData = generateOscillationData();

  const chartData = {
    datasets: [
      {
        label: "Сложение колебаний",
        data: oscillationData,
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        showLine: true,
        pointRadius: 0,
      },
      // Добавляем ось X
      {
        label: "Ось X",
        data: [
          { x: -250, y: 0 },
          { x: 250, y: 0 },
        ],
        borderColor: "rgb(0, 0, 0,0.2)",
        borderWidth: 2,
        showLine: true,
        pointRadius: 0,
        fill: false,
        tension: 0,
      },
      // Добавляем ось Y
      {
        label: "Ось Y",
        data: [
          { x: 0, y: -250 },
          { x: 0, y: 250 },
        ],
        borderColor: "rgb(0, 0, 0, 0.2)",
        borderWidth: 2,
        showLine: true,
        pointRadius: 0,
        fill: false,
        tension: 0,
      },
    ],
  };

  const chartOptions = {
    animation: false,
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        type: "linear",
        min: -250,
        max: 250,
        grid: {
          display: true,
          drawBorder: false,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          beginAtZero: true,
          stepSize: 50,
        },
      },
      y: {
        type: "linear",
        min: -250,
        max: 250,
        grid: {
          display: true,
          drawBorder: false,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          beginAtZero: true,
          stepSize: 50,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col items-stretch min-h-screen p-6 text-xl bg-white lg:flex-row">
      {/* Левый блок с графиком */}
      <div className="flex items-center justify-center flex-grow lg:w-3/4">
        <div className="relative w-full" style={{ maxWidth: "600px" }}>
          <div className="bg-gray-200 h-[800px] w-[800px] aspect-w-1 aspect-h-1">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Правый блок с настройками */}
      <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-md lg:w-1/4">
        <h2 className="text-lg font-bold text-black">Настройки</h2>
        <div>
          <label className="block mb-1 text-black">Амплитуда X (A):</label>
          <input
            type="number"
            value={A}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full px-2 py-1 text-black border rounded"
          />
          <input
            type="range"
            min="0"
            max="200"
            value={A}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>
        <div>
          <label className="block mb-1 text-black">Амплитуда Y (B):</label>
          <input
            type="number"
            value={B}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full px-2 py-1 text-black border rounded"
          />
          <input
            type="range"
            min="0"
            max="200"
            value={B}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>
        <div>
          <label className="block mb-1 text-black">Разность фаз (α):</label>
          <input
            type="number"
            value={alpha}
            step="0.1"
            onChange={(e) => setAlpha(Number(e.target.value))}
            className="w-full px-2 py-1 text-black border rounded"
          />
          <input
            type="range"
            min="-Math.PI"
            max="Math.PI"
            value={alpha}
            step="0.03"
            onChange={(e) => setAlpha(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>
        <div>
          <label className="block mb-1 text-black">
            Соотношение частот (ω2/ω1):
          </label>

          <input
            type="number"
            value={frequencyRatio}
            step="0.005"
            onChange={(e) => setFrequencyRatio(Number(e.target.value))}
            className="w-full px-2 py-1 text-black border rounded"
          />
          <input
            type="range"
            min="0"
            max="15"
            value={frequencyRatio}
            step="1"
            onChange={(e) => setFrequencyRatio(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>
        <Toggle isAutoRotate={isAutoRotate} setIsAutoRotate={setIsAutoRotate} />
      </div>
    </div>
  );
};

export default Oscillations;
