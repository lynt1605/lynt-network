"use client";

import { useState } from "react";

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!text.trim()) return alert("Nhập nội dung trước đã!");
    setLoading(true);
    setAudioUrl(null);

    try {
    const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'vi-VN';
      utterance.rate = 1;  // tốc độ
      utterance.pitch = 1; // cao độ

      // Cắt đoạn dài > 200 ký tự
      const chunks = text.match(/.{1,200}(\s|$)/g) || [];
      const speakChunk = (i = 0) => {
        if (i >= chunks.length) return;
        utterance.text = chunks[i];
        utterance.onend = () => speakChunk(i + 1);
        speechSynthesis.speak(utterance);
      };
      speakChunk();
      // setAudioUrl(url);
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi chuyển văn bản thành giọng nói!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-[80px]">
      <div className="bg-white dark:bg-gray-800 p-16 rounded-[32px] shadow-2xl w-full max-w-5xl">
        <h1 className="text-5xl font-bold mb-10 text-center dark:text-white tracking-tight">
          🗣️ Text → Voice Converter
        </h1>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập đoạn văn cần đọc..."
          className="w-full h-[300px] p-6 text-xl border border-gray-300 rounded-2xl 
                     focus:ring-4 focus:ring-sky-500 outline-none resize-none 
                     dark:bg-gray-700 dark:text-white dark:border-gray-600"
        ></textarea>

        <button
          onClick={handleConvert}
          disabled={loading}
          className="mt-8 w-full bg-sky-600 hover:bg-sky-700 text-white text-xl font-semibold 
                     py-4 rounded-2xl transition-all duration-300 shadow-lg 
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "🎧 Đang xử lý..." : "🔊 Convert to Voice"}
        </button>

        {audioUrl && (
          <div className="mt-10">
            <audio controls className="w-full rounded-xl">
              <source src={audioUrl} type="audio/mp3" />
              Trình duyệt không hỗ trợ audio.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}
