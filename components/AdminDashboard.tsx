
import React, { useState } from 'react';
import { Order, AdminView, AppConfig } from '../types';
import { GOOGLE_SHEET_URL } from '../constants';

interface Props {
  orders: Order[];
  config: AppConfig;
  onClose: () => void;
  onClear: () => void;
  onUpdateConfig: (config: AppConfig) => void;
}

const AdminDashboard: React.FC<Props> = ({ orders, config, onClose, onClear, onUpdateConfig }) => {
  const [view, setView] = useState<AdminView>(AdminView.LOGIN);
  const [password, setPassword] = useState('');
  const [tempConfig, setTempConfig] = useState<AppConfig>({ ...config });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123456') {
      setView(AdminView.DASHBOARD);
    } else {
      alert('Mật khẩu quản trị không chính xác!');
    }
  };

  const saveConfig = () => {
    onUpdateConfig(tempConfig);
    alert('Đã cập nhật cấu hình hệ thống!');
  };

  const handleGalleryChange = (value: string) => {
    const urls = value.split('\n').map(u => u.trim()).filter(u => u !== '');
    setTempConfig({ ...tempConfig, galleryImageUrls: urls });
  };

  const resetSheetUrl = () => {
    setTempConfig({ ...tempConfig, googleSheetUrl: GOOGLE_SHEET_URL });
  };

  if (view === AdminView.LOGIN) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
        <div className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-2xl animate-scaleUp">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🔒</div>
            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Hệ thống Quản Trị</h3>
            <p className="text-gray-500 text-sm">Vui lòng nhập mật khẩu truy cập</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              autoFocus
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-[#0056b3] focus:outline-none transition" 
              placeholder="••••••••"
            />
            <div className="flex gap-4">
              <button type="button" onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-200 transition">Hủy</button>
              <button type="submit" className="flex-1 bg-[#0056b3] text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition">Vào</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 md:p-8 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[90vh] flex flex-col shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20">
        <div className="bg-gray-900 text-white p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-6">
            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg font-black text-xl">📊</div>
            <div className="flex gap-2">
               <button 
                  onClick={() => setView(AdminView.DASHBOARD)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${view === AdminView.DASHBOARD ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
               >
                  Đơn hàng
               </button>
               <button 
                  onClick={() => setView(AdminView.SETTINGS)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${view === AdminView.SETTINGS ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
               >
                  Cấu hình
               </button>
            </div>
          </div>
          <div className="flex gap-4">
            {view === AdminView.DASHBOARD && (
              <button 
                onClick={onClear} 
                className="px-4 py-2 bg-red-600/10 text-red-500 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition border border-red-600/20"
              >
                Xóa tất cả đơn
              </button>
            )}
            <button 
              onClick={onClose} 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 hover:bg-gray-700 transition border border-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-white custom-scrollbar">
          {view === AdminView.DASHBOARD ? (
             <table className="w-full text-sm text-left text-gray-600 border-collapse min-w-[800px]">
               <thead className="text-[11px] text-gray-400 uppercase tracking-widest bg-gray-50/80 sticky top-0 shadow-sm z-10">
                 <tr>
                   <th className="px-8 py-5 border-b font-black">Thời gian</th>
                   <th className="px-8 py-5 border-b font-black">Khách hàng</th>
                   <th className="px-8 py-5 border-b font-black">Liên hệ</th>
                   <th className="px-8 py-5 border-b font-black">Địa chỉ</th>
                   <th className="px-8 py-5 border-b font-black">Ghi chú</th>
                   <th className="px-8 py-5 border-b font-black text-center">Trạng thái</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {orders.length === 0 ? (
                   <tr>
                     <td colSpan={6} className="text-center py-32">
                       <div className="text-6xl mb-4 grayscale opacity-20">📦</div>
                       <div className="text-gray-300 font-bold uppercase tracking-widest">Chưa có dữ liệu đơn hàng</div>
                     </td>
                   </tr>
                 ) : (
                   orders.map(order => (
                     <tr key={order.id} className="hover:bg-blue-50/50 transition">
                       <td className="px-8 py-6 whitespace-nowrap text-gray-400 font-mono text-[11px]">
                         {new Date(order.createdAt).toLocaleString('vi-VN')}
                       </td>
                       <td className="px-8 py-6 font-black text-gray-800">{order.name}</td>
                       <td className="px-8 py-6">
                         <span className="bg-blue-50 text-[#0056b3] px-3 py-1.5 rounded-lg font-black font-mono shadow-sm">
                           {order.phone}
                         </span>
                       </td>
                       <td className="px-8 py-6 text-gray-500 text-xs max-w-xs break-words leading-relaxed">{order.address}</td>
                       <td className="px-8 py-6 italic text-gray-400 text-[11px]">{order.note || '-'}</td>
                       <td className="px-8 py-6 text-center">
                         <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-700 border border-green-200 shadow-sm">
                           Mới
                         </span>
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
          ) : (
             <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-10 pb-20">
                <div className="text-center">
                  <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Cấu hình hệ thống</h3>
                  <p className="text-gray-500 text-sm font-medium mt-1">Quản lý hình ảnh và thông báo đơn hàng</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b pb-2">Hình ảnh chính</h4>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-blue-600">Ảnh Hero (W: 1000px+)</label>
                        <input 
                          type="text" 
                          value={tempConfig.heroImageUrl}
                          onChange={e => setTempConfig({...tempConfig, heroImageUrl: e.target.value})}
                          className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:outline-none font-medium text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-blue-600">Ảnh Thông số kỹ thuật</label>
                        <input 
                          type="text" 
                          value={tempConfig.specsImageUrl}
                          onChange={e => setTempConfig({...tempConfig, specsImageUrl: e.target.value})}
                          className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:outline-none font-medium text-sm"
                        />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b pb-2">Thông báo & Dữ liệu</h4>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-red-600">Email nhận thông báo 📧</label>
                        <input 
                          type="email" 
                          value={tempConfig.notificationEmail}
                          onChange={e => setTempConfig({...tempConfig, notificationEmail: e.target.value})}
                          className="w-full p-4 border-2 border-red-50 rounded-2xl focus:border-red-500 focus:outline-none font-black text-sm text-red-600"
                          placeholder="admin@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-black uppercase tracking-widest text-blue-600">Google App Script URL</label>
                          <button 
                            onClick={resetSheetUrl}
                            className="text-[9px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-widest transition underline underline-offset-2"
                          >
                            Khôi phục mặc định
                          </button>
                        </div>
                        <input 
                          type="text" 
                          value={tempConfig.googleSheetUrl}
                          onChange={e => setTempConfig({...tempConfig, googleSheetUrl: e.target.value})}
                          className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:outline-none font-medium text-xs leading-relaxed"
                          placeholder="https://script.google.com/macros/s/.../exec"
                        />
                    </div>
                    
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b pb-2 pt-4">Thư viện ảnh sản phẩm</h4>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Danh sách URL (Mỗi dòng một URL)</label>
                        <textarea 
                          value={tempConfig.galleryImageUrls.join('\n')}
                          onChange={e => handleGalleryChange(e.target.value)}
                          rows={4}
                          className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:outline-none font-medium text-xs leading-relaxed custom-scrollbar"
                        />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-6">
                  <button 
                      onClick={saveConfig}
                      className="w-full bg-[#0056b3] text-white font-black py-5 rounded-2xl text-xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition active:scale-95"
                  >
                      LƯU TẤT CẢ CẤU HÌNH
                  </button>
                  <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 text-xs text-blue-800 leading-relaxed font-medium">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-xl">💡</span>
                       <span className="font-black uppercase tracking-widest">Gửi Email tự động:</span>
                    </div>
                    <p className="mb-2">Trong file Apps Script của bạn, hãy thêm dòng code này vào cuối hàm <b>doPost(e)</b> để nhận email ngay khi có khách:</p>
                    <code className="block bg-white p-3 rounded-xl border border-blue-200 font-mono text-[10px] overflow-x-auto">
                      {"MailApp.sendEmail(data.notificationEmail, 'ĐƠN HÀNG MỚI: ' + data.name, 'Thông tin khách hàng: ' + JSON.stringify(data));"}
                    </code>
                  </div>
                </div>
             </div>
          )}
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[11px] text-gray-400 font-bold uppercase tracking-widest">
           <span>{view === AdminView.DASHBOARD ? `Hệ thống: ${orders.length} đơn hàng` : 'Chế độ cấu hình kết nối'}</span>
           <span>Đức Phương Admin Pro v3.3</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
