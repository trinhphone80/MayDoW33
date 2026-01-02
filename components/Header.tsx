
import React from 'react';
import { IMAGES, CONTACT } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="fixed w-full top-0 z-[60] px-4 py-4 pointer-events-none">
      <div className="container mx-auto max-w-7xl pointer-events-auto">
        <div className="glass-panel px-6 py-3 rounded-[2rem] flex justify-between items-center shadow-2xl shadow-gray-200">
          <div className="flex items-center gap-4">
            <img src={IMAGES.logo} alt="Đức Phương Medical" className="h-10 md:h-12 object-contain" />
            <div className="hidden sm:block border-l border-gray-200 pl-4">
              <h1 className="font-extrabold text-lg text-gray-900 tracking-tight leading-none uppercase">ĐỨC PHƯƠNG</h1>
              <p className="text-[8px] font-black text-premium-red tracking-[0.4em] uppercase mt-1">Medical Center</p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Hotline xác nhận:</span>
              <a href={`tel:${CONTACT.phone.replace(/\./g, '')}`} className="text-base font-extrabold text-gray-900 hover:text-premium-red transition tracking-tighter">
                {CONTACT.phone}
              </a>
            </div>
            <a href="#order-form" className="bg-premium-red text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-200 uppercase tracking-wider active:scale-95">
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
