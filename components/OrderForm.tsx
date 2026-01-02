
import React, { useState } from 'react';
import { Order } from '../types';

interface Props {
  onOrderSuccess: (order: Order) => void;
  thumbUrl: string;
  googleSheetUrl?: string;
  notificationEmail?: string;
}

const OrderForm: React.FC<Props> = ({ onOrderSuccess, thumbUrl, googleSheetUrl, notificationEmail }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const productInfo = 'QUÀ TẶNG MÁY W33 (0Đ) + PHỤ KIỆN';
    
    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 11),
      ...formData,
      product: productInfo,
      createdAt: Date.now()
    };

    if (googleSheetUrl && googleSheetUrl.trim().startsWith('http')) {
      try {
        await fetch(googleSheetUrl, {
          method: 'POST',
          mode: 'no-cors', 
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            ...formData,
            product: productInfo,
            notificationEmail: notificationEmail || 'duyphuong7@gmail.com'
          }),
        });
      } catch (error) {
        console.error('API Error:', error);
      }
    }

    onOrderSuccess(newOrder);
    setIsSubmitting(false);
    setFormData({ name: '', phone: '', address: '', note: '' });
  };

  return (
    <section id="order-form" className="py-32 bg-gray-50 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row bg-white rounded-[4rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100">
          
          {/* Order Summary Side */}
          <div className="w-full lg:w-[40%] bg-premium-red p-12 lg:p-16 text-white flex flex-col">
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Giỏ hàng ưu đãi</h2>
              <p className="text-red-100 text-sm font-medium">Bác hãy kiểm tra lại thông tin suất quà tặng trước khi xác nhận nhé.</p>
            </div>

            <div className="flex-1 space-y-8">
              <div className="flex gap-6 items-center">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl p-1.5 flex-shrink-0">
                  <img src={thumbUrl} alt="AICARE W33" className="w-full h-full object-cover rounded-2xl" />
                </div>
                <div className="space-y-1">
                  <div className="font-black text-sm uppercase tracking-tight">Máy đo AICARE W33</div>
                  <div className="inline-block bg-white text-premium-red px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Suất tặng 0Đ</div>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <PriceRow label="Giá niêm yết" value="499.000đ" strike />
                <PriceRow label="Ưu đãi chiến dịch" value="-499.000đ" white />
                <PriceRow label="Phí xử lý & vận chuyển" value="70.000đ" bold />
                <div className="h-px bg-white/10 my-4"></div>
                <div className="flex justify-between items-center text-2xl font-black">
                  <span>TỔNG CỘNG</span>
                  <span className="bg-white text-premium-red px-5 py-2 rounded-2xl shadow-xl">70.000đ</span>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
               <div className="flex items-center gap-4 text-xs font-bold leading-relaxed">
                  <span className="text-2xl">🎁</span>
                  <span className="text-white">Tặng thêm 25 Que thử, 50 Kim & 2 Ebook sức khỏe trị giá 499k.</span>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-[60%] p-12 lg:p-20">
            <div className="space-y-10">
              <div className="space-y-2 text-center lg:text-left">
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Địa chỉ nhận quà</h3>
                <p className="text-gray-400 text-sm font-medium">Nhân viên sẽ gọi điện xác nhận trước khi giao máy.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <InputGroup label="Họ tên bác" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} placeholder="Ví dụ: Nguyễn Văn A" required />
                  <InputGroup label="Số điện thoại" value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} placeholder="090 123 4xxx" type="tel" required />
                </div>

                <InputGroup label="Địa chỉ nhận máy chi tiết" value={formData.address} onChange={(v: string) => setFormData({...formData, address: v})} placeholder="Số nhà, tên đường, phường/xã..." required isTextArea />

                <InputGroup label="Lời nhắn (nếu có)" value={formData.note} onChange={(v: string) => setFormData({...formData, note: v})} placeholder="Ví dụ: Giao giờ hành chính..." isTextArea />

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-premium-red text-white font-black py-6 rounded-3xl text-xl shadow-2xl shadow-red-200 transition-all hover:bg-red-700 active:scale-95 disabled:opacity-50 uppercase tracking-widest"
                  >
                    {isSubmitting ? "Đang xử lý thông tin..." : "Xác nhận đăng ký ngay ➔"}
                  </button>
                  <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-6">Cam kết bảo mật thông tin khách hàng tuyệt đối</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PriceRow = ({label, value, strike, white, bold}: {label: string, value: string, strike?: boolean, white?: boolean, bold?: boolean}) => (
  <div className={`flex justify-between items-center text-sm ${bold ? 'font-black' : 'font-medium'} ${white ? 'text-white' : 'text-red-100'}`}>
    <span className="opacity-70">{label}:</span>
    <span className={strike ? 'line-through opacity-50' : ''}>{value}</span>
  </div>
);

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  isTextArea?: boolean;
}

const InputGroup = ({label, value, onChange, placeholder, type = "text", required, isTextArea}: InputGroupProps) => (
  <div className="space-y-2.5">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">{label} {required && '*'}</label>
    {isTextArea ? (
      <textarea 
        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-premium-red focus:outline-none transition-all font-bold text-sm shadow-inner"
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={2}
        placeholder={placeholder}
        required={required}
      />
    ) : (
      <input 
        type={type}
        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-premium-red focus:outline-none transition-all font-bold text-sm shadow-inner"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
);

export default OrderForm;
