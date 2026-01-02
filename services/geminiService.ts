
import { GoogleGenAI } from "@google/genai";

/**
 * Trợ lý tư vấn sức khỏe Đức Phương Medical.
 * Sử dụng Gemini 3 Flash cho phản hồi nhanh và chính xác.
 */
export const getHealthAdvice = async (userPrompt: string) => {
  // Lấy API_KEY trực tiếp từ process.env (được Vite nạp vào runtime)
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "undefined") {
    console.error("LỖI: API_KEY không tồn tại trong môi trường.");
    return "Dạ, hiện tại hệ thống tư vấn AI đang bận một chút. Bác vui lòng gọi hotline 0903.162.808 để em hỗ trợ bác ngay lập tức ạ!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: `Bạn là "Phương Anh" - Chuyên viên tư vấn tận tâm của Đức Phương Medical.
        Nhiệm vụ: Tư vấn về chương trình TẶNG MÁY ĐO ĐƯỜNG HUYẾT AICARE W33 GIÁ 0 ĐỒNG.
        
        Thông tin cốt lõi:
        - Giá máy: 0 ĐỒNG (Tặng hoàn toàn thân máy chính hãng).
        - Phí duy nhất: 70.000đ (Chi phí đóng gói, lưu kho và vận chuyển tận nhà toàn quốc).
        - Quà tặng đi kèm: 1 Bút lấy máu, 25 Que thử y tế, 50 Kim lấy máu.
        - Quà tặng tri thức: 2 cuốn Ebook "Sống khỏe cùng tiểu đường" trị giá 199k (Gửi qua Zalo sau khi nhận máy).
        - Bảo hành: Lỗi 1 đổi 1 TRỌN ĐỜI.
        
        Phong cách giao tiếp:
        - Luôn bắt đầu bằng lời chào lễ phép: "Dạ, Đức Phương xin chào bác/anh/chị ạ".
        - Xưng hô thân mật: Bác, Cô, Chú, Anh, Chị.
        - Giọng văn: Ấm áp, chuyên nghiệp, thấu hiểu nỗi lo của người bệnh tiểu đường.
        - Nếu khách hỏi về độ chính xác: Máy đạt chuẩn CE (Châu Âu), đo nhanh 5s, chỉ cần 0.7 microlit máu.
        
        Mục tiêu cuối cùng: Thuyết phục khách hàng kéo xuống cuối trang điền "Họ tên + Số điện thoại" vào Form để giữ suất quà vì số lượng tặng mỗi ngày có hạn (chỉ còn vài suất).`,
        temperature: 0.8,
      },
    });

    return response.text || "Dạ, em chưa hiểu rõ ý bác. Bác có thể hỏi lại về máy W33 hoặc chương trình tặng quà được không ạ?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Dạ, máy chủ tư vấn đang quá tải do nhiều bác đăng ký quá. Bác vui lòng điền thông tin vào form bên dưới, bên em sẽ gọi lại tư vấn kỹ cho bác ạ!";
  }
};
