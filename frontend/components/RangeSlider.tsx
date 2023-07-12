"use client";
import React, { useState } from "react";

interface RangeSliderProps {
  minValue: number;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  maxValue: number;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
}) => {
  const handleMinChange = (event: any) => {
    setMinValue(event.target.value);
  };

  const handleMaxChange = (event: any) => {
    setMaxValue(event.target.value);
  };

  return (
    <div className="min-max-range flex flex-col gap-10 items-center">
      <div>
        <input
          type="range"
          min="0"
          max="750"
          value={minValue}
          onChange={handleMinChange}
          className="range"
          id="min"
        />
        <input
          type="range"
          min="751"
          max="1500"
          value={maxValue}
          onChange={handleMaxChange}
          className="range"
          id="max"
        />
      </div>
      <div className="flex gap-10">
        <h1>Min:{minValue}</h1>
        <h1>Max:{maxValue}</h1>
      </div>
    </div>
  );
};

export default RangeSlider;
