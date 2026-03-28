import { useState } from "react";
import "./index.css";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [mp3, setMp3] = useState(null);

  async function handleConvert() {
    if (!file && !url) {
      alert("Please provide file or URL");
      return;
    }

    try {
      setLoading(true);
      let response;

      if (url) {
        response = await axios.post("http://localhost:3001/api/urlupload", {
          url,
        });
      } else if (file) {
        const formData = new FormData();
        formData.append("video", file);

        response = await axios.post(
          "http://localhost:3001/api/upload",
          formData
        );
      }

      setMp3(response.data.mp3);
    } catch (error) {
      console.error(error);
      alert("Conversion failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {
    if (!mp3) return;

    try {
      const response = await axios.get(
        `http://localhost:3001/api/download/${mp3}`,
        { responseType: "blob" }
      );

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", mp3);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert("Download failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      
      <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-2xl space-y-5">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center">
          🎧 Video → MP3 Converter
        </h1>

        {/* URL Input */}
      

        

        {/* Drag & Drop Area */}
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition">
          <p className="text-gray-400">
            {file ? file.name : "Click or Drag video here"}
          </p>
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition"
        >
          🚀 Convert to MP3
        </button>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            Converting...
          </div>
        )}

        {/* Success + Download */}
        {mp3 && !loading && (
          <div className="space-y-3">
            <p className="text-green-400 text-center">
              ✅ MP3 Ready!
            </p>
            <button
              onClick={handleDownload}
              className="w-full py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 transition"
            >
              ⬇ Download MP3
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;