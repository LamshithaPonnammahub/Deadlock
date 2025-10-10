import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [count, setCount] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please upload an image first");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/detect", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setCount(data.vehicle_count);
      setImage(`data:image/jpeg;base64,${data.image}`);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ 
      textAlign: "center", 
      marginTop: "50px", 
      fontFamily: "Arial, sans-serif",
      background: "#f9fafc", 
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1 style={{ color: "#e63946" }}>🚑 AI-Powered Vehicle Detection</h1>
      <p style={{ color: "#333", fontSize: "18px" }}>
        Upload a traffic image and let AI count vehicles in real-time
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{
          margin: "20px 0",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />
      <br />

      <button
        onClick={handleUpload}
        style={{
          marginTop: "10px",
          padding: "12px 25px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#1d3557",
          color: "white",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.2)"
        }}
      >
        {loading ? "Detecting..." : "🚀 Detect Vehicles"}
      </button>

      {count !== null && (
        <h2 style={{ marginTop: "30px", color: "#457b9d" }}>
          ✅ Total Vehicles Detected: <span style={{ color: "#e63946" }}>{count}</span>
        </h2>
      )}

      {image && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#1d3557" }}>Detection Result:</h3>
          <img
            src={image}
            alt="Detected result"
            style={{
              maxWidth: "80%",
              border: "3px solid #457b9d",
              borderRadius: "10px",
              marginTop: "10px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.3)"
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
