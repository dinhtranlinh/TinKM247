import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function Countdown() {
  const targetDate = new Date(); // Ngày kết thúc đếm ngược (hiện tại)
  targetDate.setDate(targetDate.getDate() + 10); // Cộng thêm 10 ngày

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft(endDate) {
    const difference = +endDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  return (
    <div className="countdown">
      {timeLeft.days > 0 && <div className="countdown-item">{timeLeft.days} ngày</div>}
      <div className="countdown-item">{timeLeft.hours} giờ</div>
      <div className="countdown-item">{timeLeft.minutes} phút</div>
      <div className="countdown-item">{timeLeft.seconds} giây</div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>CHUẨN BỊ MỞ WEB TRONG : </h1>
      <Countdown />

    </div>
  );
}

export default App;
