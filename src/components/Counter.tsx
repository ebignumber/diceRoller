import React from 'react';
import './Counter.css';

interface CounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({ label, value, onChange }) => {
  return (
    <div className="counter-wrapper">
      <label className="counter-label">{label}</label>
      <div className="counter-container">
        <button onClick={() => onChange(value - 1)} className="counter-button">
          -
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="counter-input"
        />
        <button onClick={() => onChange(value + 1)} className="counter-button">
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
