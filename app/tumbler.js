import { useState } from "react";

function Toggle({ setIsAutoRotate, isAutoRotate }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <span className="mr-2 text-black">Авто-вращение</span>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isAutoRotate}
          onChange={() => setIsAutoRotate(!isAutoRotate)}
        />
        <div
          className={`w-10 h-6 bg-gray-300 rounded-full transition-colors duration-200 ease-in-out ${
            isAutoRotate ? "bg-[#4bc0c0]" : ""
          }`}
        >
          <div
            className={`dot w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform duration-200 ease-in-out ${
              isAutoRotate ? "transform translate-x-4" : ""
            }`}
          ></div>
        </div>
      </div>
    </label>
  );
}

export default Toggle;
