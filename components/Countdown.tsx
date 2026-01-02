
import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-20 relative overflow-hidden bg-gray-900">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block bg-premium-red/10 text-premium-red px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] border border-premium-red/20">
            Cơ hội cuối cùng trong ngày
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
            ƯU ĐÃI KẾT THÚC SAU
          </h2>
          
          <div className="flex justify-center items-center gap-4 md:gap-8">
            <TimeUnit value={format(timeLeft.hours)} label="Giờ" />
            <span className="text-4xl font-black text-gray-700 self-start mt-4">:</span>
            <TimeUnit value={format(timeLeft.minutes)} label="Phút" />
            <span className="text-4xl font-black text-gray-700 self-start mt-4">:</span>
            <TimeUnit value={format(timeLeft.seconds)} label="Giây" />
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-white/60">
            <div className="flex -space-x-3 overflow-hidden">
               {[1,2,3,4,5].map(i => (
                 <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-900" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
               ))}
            </div>
            <p className="text-sm font-bold uppercase tracking-widest">
              Đã có <span className="text-yellow-400">1.284 người</span> đăng ký hôm nay
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimeUnit = ({value, label}: {value: string, label: string}) => (
  <div className="space-y-3">
    <div className="w-20 h-20 md:w-32 md:h-32 bg-white/5 border border-white/10 backdrop-blur rounded-[2rem] flex items-center justify-center shadow-2xl">
      <span className="text-4xl md:text-6xl font-[900] text-white tracking-tighter">{value}</span>
    </div>
    <div className="text-[10px] md:text-xs font-black text-blue-500 uppercase tracking-[0.3em]">{label}</div>
  </div>
);

export default Countdown;
