import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function CountdownTimer() {
  const calculateTimeLeft = (): TimeLeft | null => {
    const targetDate = new Date("2025-01-17T00:00:00").getTime(); // Thời gian đích
    const now = new Date().getTime(); // Thời gian hiện tại
    const difference = targetDate - now; // Khoảng cách giữa thời gian đích và hiện tại

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return null; // Thời gian đã hết
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Dọn dẹp bộ đếm khi component bị unmount
  }, []);

  if (!timeLeft) {
    return (
      <div className="flex justify-center items-center mt-4 text-xl font-bold text-red-600">
        Time's up!
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-4">
      {/* <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Countdown to: January 1, 2025
      </h2> */}
      <div className="flex space-x-4">
        {Object.entries(timeLeft).map(([interval, value]) => (
          <div key={interval} className="text-center">
            <div className="text-3xl font-bold bg-gray-200 rounded-lg px-4 py-2">
              {String(value).padStart(2, "0")}
            </div>
            <div className="text-sm font-medium text-gray-600">{interval}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
