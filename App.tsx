
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Countdown from './components/Countdown';
import OrderForm from './components/OrderForm';
import HealthAssistant from './components/HealthAssistant';
import AdminDashboard from './components/AdminDashboard';
import ProductGallery from './components/ProductGallery';
import { Order, AppConfig } from './types';
import { IMAGES, CONTACT, GOOGLE_SHEET_URL } from './constants';

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aicare_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('aicare_config');
    const defaultConfig: AppConfig = {
      heroImageUrl: IMAGES.hero,
      specsImageUrl: IMAGES.specs,
      thumbImageUrl: IMAGES.thumb,
      galleryImageUrls: IMAGES.gallery,
      googleSheetUrl: GOOGLE_SHEET_URL,
      notificationEmail: CONTACT.email,
    };
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const oldUrlPart = 'AKfycbwCCdMUHhw5WnJ';
        if (!parsed.googleSheetUrl || parsed.googleSheetUrl.includes(oldUrlPart)) {
          parsed.googleSheetUrl = GOOGLE_SHEET_URL;
        }
        if (!parsed.notificationEmail || parsed.notificationEmail === 'ducphuongmedical@gmail.com') {
          parsed.notificationEmail = CONTACT.email;
        }
        return { ...defaultConfig, ...parsed };
      } catch (e) {
        return defaultConfig;
      }
    }
    return defaultConfig;
  });
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [lastNotification, setLastNotification] = useState<{name: string, loc: string} | null>(null);

  useEffect(() => {
    localStorage.setItem('aicare_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aicare_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    const names = ["Chị Lan", "Anh Tuấn", "Cô Hạnh", "Chú Bình", "Bác Nam", "Chị Mai", "Anh Hoàng", "Cô Thảo"];
    const locs = ["Hà Nội", "TP.HCM", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Bình Dương", "Nghệ An"];
    
    const triggerNotification = () => {
      setLastNotification({
        name: names[Math.floor(Math.random() * names.length)],
        loc: locs[Math.floor(Math.random() * locs.length)]
      });
      setTimeout(() => setLastNotification(null), 4000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.4) triggerNotification();
    }, 18000);
    
    return () => clearInterval(interval);
  }, []);

  const handleOrderSuccess = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
    setShowSuccess(order.name);
  }, []);

  const updateConfig = useCallback((newConfig: AppConfig) => {
    setConfig(newConfig);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero Section - Redesigned for Impact */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-50/30 -skew-x-12 transform origin-top translate-x-1/4 -z-10"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-red-100/40 rounded-full blur-[120px] -z-10"></div>

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-[55%] space-y-10 animate-fadeIn text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-full text-[11px] font-extrabold tracking-[0.2em] text-premium-red shadow-sm border border-red-50 mx-auto lg:mx-0">
                <span className="flex h-2.5 w-2.5 bg-premium-red rounded-full animate-pulse"></span>
                PHỤC VỤ 1 TRIỆU NGƯỜI TIỂU ĐƯỜNG VIỆT NAM
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-[900] leading-[1.05] tracking-tight text-gray-900">
                  <span className="block mb-2 text-medical-blue">Đức Phương</span>
                  <span className="text-gradient-red">Tặng Máy W33</span>
                </h1>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <div className="px-8 py-4 bg-premium-red rounded-[1.5rem] shadow-2xl shadow-red-300 shaking-element">
                    <span className="text-6xl md:text-8xl font-black text-white leading-none">0Đ</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-gray-400 line-through text-lg font-bold">Giá gốc: 499.000đ</div>
                    <div className="text-premium-red font-extrabold text-xl uppercase tracking-tighter italic">Suất tặng ưu tiên</div>
                  </div>
                </div>
              </div>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                Cam kết máy chính hãng đạt chuẩn y tế Châu Âu. Chúng tôi hỗ trợ 100% chi phí mua máy để giúp các bác kiểm soát đường huyết tại nhà tốt hơn.
              </p>
              
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#order-form" className="bg-premium-red text-white font-extrabold py-6 px-12 rounded-[2rem] text-xl shadow-2xl shadow-red-200 transition-all hover:scale-105 active:scale-95 text-center">
                  Nhận quà 0Đ ngay
                </a>
                <div className="flex items-center gap-3 px-6 py-4 bg-white/50 backdrop-blur rounded-[2rem] border border-red-100">
                  <span className="text-3xl">🚚</span>
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase text-gray-400">Chỉ thanh toán phí ship</div>
                    <div className="text-sm font-bold text-premium-red">70.000đ khi nhận máy</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-[45%] relative">
              <div className="absolute inset-0 bg-premium-red rounded-[4rem] rotate-6 scale-95 opacity-[0.03] -z-10"></div>
              <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white float-animation">
                <img src={config.heroImageUrl} alt="AICARE W33" className="w-full h-auto object-cover" />
                <div className="absolute top-8 right-8 bg-premium-red text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white/50">
                  <span className="text-[10px] font-black uppercase">Tặng</span>
                  <span className="text-3xl font-black">0Đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Stats Section */}
      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon="🏆" title="15.000+" desc="Máy đã được tặng" isRed />
            <StatCard icon="🩺" title="Đạt chuẩn" desc="CE, ISO, FDA" />
            <StatCard icon="🛡️" title="Bảo hành" desc="Trọn đời 1-đổi-1" isRed />
            <StatCard icon="🚚" title="Giao hàng" desc="63 tỉnh thành" />
          </div>
        </div>
      </section>

      <Countdown />

      {/* Features - Premium Grid */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 relative">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-50 rounded-full blur-[80px]"></div>
               <img src={config.specsImageUrl} alt="Thông số máy" className="rounded-[3.5rem] shadow-2xl border-8 border-gray-50 relative z-10" />
            </div>
            <div className="w-full lg:w-1/2 space-y-10">
               <div className="space-y-4">
                  <div className="text-premium-red font-extrabold uppercase tracking-widest text-sm">Chất lượng bệnh viện</div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight uppercase">CHÍNH XÁC TUYỆT ĐỐI <br/><span className="text-gradient-red">SAU 5 GIÂY</span></h2>
                  <p className="text-gray-500 font-medium text-lg">Máy đo đường huyết AICARE W33 được tin dùng nhờ công nghệ cảm biến sinh học tân tiến, mang lại kết quả ổn định và chính xác cao.</p>
               </div>
               
               <div className="grid gap-6">
                  <FeatureItem icon="⚡" title="Siêu tốc độ" desc="Kết quả hiển thị chỉ sau 5 giây đo." />
                  <FeatureItem icon="🩸" title="Ít đau đớn" desc="Chỉ cần 0.7µL mẫu máu, kim lấy máu siêu mảnh." />
                  <FeatureItem icon="📊" title="Bộ nhớ lớn" desc="Lưu trữ 250 kết quả đo để theo dõi sức khỏe." />
                  <FeatureItem icon="👴" title="Dễ sử dụng" desc="Màn hình LCD lớn, số rõ nét cho người già." />
               </div>
            </div>
          </div>
        </div>
      </section>

      <ProductGallery images={config.galleryImageUrls} />

      {/* Order Section - Focus on Trust */}
      <OrderForm 
        onOrderSuccess={handleOrderSuccess} 
        thumbUrl={config.thumbImageUrl} 
        googleSheetUrl={config.googleSheetUrl}
        notificationEmail={config.notificationEmail}
      />

      {/* Professional Footer */}
      <footer className="bg-[#0a0f18] text-white pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16 pb-20 border-b border-white/5">
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center gap-4">
                <img src={IMAGES.logo} alt="Logo" className="h-12 invert brightness-200" />
                <h3 className="font-black text-2xl uppercase tracking-tighter">Đức Phương Medical</h3>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Đơn vị dẫn đầu trong lĩnh vực thiết bị y tế gia đình tại Việt Nam. Chúng tôi cam kết mang lại sự an tâm tuyệt đối cho khách hàng.
              </p>
              <div className="flex gap-4">
                <SocialLink icon="fb" />
                <SocialLink icon="zl" />
                <SocialLink icon="yt" />
              </div>
            </div>
            
            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-premium-red">Liên hệ</h4>
              <div className="space-y-6 text-gray-400">
                <div className="flex gap-4">
                  <span className="text-xl">📍</span>
                  <p className="text-sm font-medium">{CONTACT.address}</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-xl">📞</span>
                  <p className="text-2xl font-black text-white">{CONTACT.phone}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-premium-red">Hỗ trợ</h4>
              <div className="grid grid-cols-2 gap-4">
                <FooterLink text="Bảo hành" />
                <FooterLink text="Hướng dẫn" />
                <FooterLink text="Thanh toán" />
                <FooterLink text="Vận chuyển" />
                <FooterLink text="Điều khoản" />
                <FooterLink text="Bảo mật" />
              </div>
              <button onClick={() => setIsAdminOpen(true)} className="text-[9px] text-white/20 hover:text-white transition font-bold uppercase tracking-widest mt-4">Hệ thống quản trị</button>
            </div>
          </div>
          
          <div className="pt-12 text-center text-gray-600 text-xs font-bold uppercase tracking-[0.4em]">
            &copy; 2024 Đức Phương Medical. Dedicated to your health.
          </div>
        </div>
      </footer>

      <HealthAssistant />
      
      {isAdminOpen && (
        <AdminDashboard 
          orders={orders} 
          onClose={() => setIsAdminOpen(false)} 
          onClear={() => window.confirm('Xóa hết đơn?') && setOrders([])}
          config={config}
          onUpdateConfig={updateConfig}
        />
      )}

      {/* Floating Notification */}
      {lastNotification && (
        <div className="fixed bottom-24 left-4 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-xl p-5 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] z-[70] flex items-center gap-4 animate-slideInRight border border-red-50 max-w-[280px]">
          <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner text-premium-red">🎁</div>
          <div className="flex-1">
            <div className="text-[10px] text-premium-red font-extrabold uppercase tracking-widest mb-0.5">Vừa đăng ký thành công</div>
            <div className="text-sm font-black text-gray-900 truncate">{lastNotification.name} - {lastNotification.loc}</div>
            <div className="text-[9px] text-gray-400 italic">Chúc mừng bác đã nhận suất 0đ</div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0f18]/90 backdrop-blur-md px-4">
          <div className="bg-white rounded-[3.5rem] p-12 max-w-sm w-full text-center shadow-2xl animate-scaleUp border-[12px] border-red-50">
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-2xl shadow-green-200">✓</div>
            <h3 className="text-3xl font-[900] text-gray-900 mb-4 uppercase tracking-tighter leading-none">ĐĂNG KÝ <br/><span className="text-green-600">THÀNH CÔNG!</span></h3>
            <p className="text-gray-600 mb-10 text-sm leading-relaxed font-medium">Chào bác <span className="font-black text-premium-red">{showSuccess}</span>, Đức Phương đã nhận được thông tin. Nhân viên sẽ gọi lại cho bác ngay để xác nhận địa chỉ nhé!</p>
            <button onClick={() => setShowSuccess(null)} className="w-full bg-premium-red text-white font-black py-5 rounded-2xl shadow-xl hover:bg-red-700 transition-all active:scale-95 uppercase tracking-widest">Tuyệt vời!</button>
          </div>
        </div>
      )}
    </div>
  );
};

// UI Components
const StatCard = ({icon, title, desc, isRed}: {icon: string, title: string, desc: string, isRed?: boolean}) => (
  <div className={`bg-white p-8 rounded-[2.5rem] border ${isRed ? 'border-red-100' : 'border-gray-100'} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 text-center group`}>
    <div className={`text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all scale-100 group-hover:scale-110`}>{icon}</div>
    <div className={`text-2xl font-black ${isRed ? 'text-premium-red' : 'text-gray-900'} mb-1 tracking-tight`}>{title}</div>
    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{desc}</div>
  </div>
);

const FeatureItem = ({icon, title, desc}: {icon: string, title: string, desc: string}) => (
  <div className="flex items-start gap-6 p-6 rounded-3xl hover:bg-red-50/50 transition-colors group">
    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:shadow-lg transition-all group-hover:scale-110 text-premium-red">{icon}</div>
    <div className="space-y-1">
      <h4 className="font-black text-gray-900 text-lg tracking-tight uppercase">{title}</h4>
      <p className="text-gray-500 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const SocialLink = ({icon}: {icon: string}) => (
  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-premium-red transition cursor-pointer text-xs font-black uppercase">
    {icon}
  </div>
);

const FooterLink = ({text}: {text: string}) => (
  <a href="#" className="text-gray-400 hover:text-premium-red transition-colors text-sm font-medium flex items-center gap-2">
    <span className="w-1 h-1 bg-gray-700 rounded-full"></span> {text}
  </a>
);

export default App;
