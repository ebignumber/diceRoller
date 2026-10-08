import React from 'react';
import './Counter.css';

interface CounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  squares?: string[];
}


const Counter: React.FC<CounterProps> = ({ label, value, onChange, squares }) => {

  let initialSquares = Array.from({ length: value }, () => "?");

  return (
    <div className="counter-wrapper">
      <label className="counter-label">{label}</label>
      <div className="counter-container">
        <button onClick={() => onChange(value - 1)} className="counter-button">
          -
        </button>
        <div className="counter-squares-container">
          {(squares || initialSquares).map((symbol, index) => (
            <div key={index} className="counter-square">
              {symbol}
            </div>
          ))}
        </div>
        <button onClick={() => onChange(value + 1)} className="counter-button">
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
