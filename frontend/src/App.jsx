import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeText = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // NOTE: Calling the FastAPI endpoint /predict
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
          throw new Error(`Backend response failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Server not reachable or API error. Check backend terminal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // min-h-screen, flex, and bg-gray-100 center the card and provide a soft background.
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl transition duration-500 hover:shadow-2xl">
        
        {/* Title Section */}
        <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          🛡️ AI Cyber Threat Detection
        </h1>
        
        {/* Input Form */}
        <form onSubmit={analyzeText}>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-xl mb-4 text-lg resize-none focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-150"
            rows="6"
            placeholder="Paste email or message here for threat analysis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            // Use indigo color for brand identity
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition duration-150 transform hover:scale-[1.01]"
          >
            {loading ? "Analyzing Threat..." : "Detect Threat"}
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-100 text-red-700 font-medium border border-red-300 shadow-sm">
            ❌ Error: {error}
          </div>
        )}
        
        {/* Results Card */}
        {result && (
          <div 
            // Dynamic border and background based on prediction status
            className={`mt-6 p-6 rounded-xl shadow-lg transition duration-300 border-l-8 
              ${result.prediction === 'phishing' ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'}`}
          >
            <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
                {result.prediction === 'phishing' ? '🚨 Threat Detected' : '✅ Safe'}
            </h2>
            <p className="text-lg mb-1">
              <strong className="text-gray-600">Prediction:</strong> 
              <span className={`font-extrabold ml-2 ${result.prediction === 'phishing' ? 'text-red-700' : 'text-green-700'}`}>
                {result.prediction.toUpperCase()}
              </span>
            </p>
            <p className="text-md">
              <strong className="text-gray-600">Confidence Score:</strong> {result.confidence}
            </p>
            <p className="mt-4 text-sm italic text-gray-500">
              *Analysis completed successfully by the FastAPI backend.*
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;