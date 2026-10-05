import React from 'react';
import { useState } from 'react'
import './Counter.css';

interface props {
  label: string
}

const Counter: React.FC<props> = ({ label }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-wrapper">
      <label className="counter-label">{label}</label>
      <div className="counter-container">
        <button onClick={() => setCount(count - 1)} className="counter-button">
          -
        </button>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="counter-input"
        />
        <button onClick={() => setCount(count + 1)} className="counter-button">
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
