import React, { useState } from "react";
import "./styles.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  // A function to generate a random string of 6 characters
  const generateId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  // A function to shorten a URL without using an API
  const shortenUrl = (e) => {
    e.preventDefault();
    try {
      // Get the URL from the input field
      let longUrl = url;
      // Generate a random identifier
      let id = generateId();
      // Create a shortened URL using the current domain and the identifier
      let shortUrl = window.location.origin + "/" + id;
      // Store the long URL and the identifier in local storage
      localStorage.setItem(id, longUrl);
      // Set the shortened URL as the state
      setShortenedUrl(shortUrl);
    } catch (e) {
      alert(e);
    }
  };

  // A function to copy the shortened URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    alert("Copied to clipboard");
  };

  return (
    <div className="app">
      <div className="shortener">
        <h2>URL shortener</h2>
        {/* form to enter URL to be shortened */}
        <form>
          <input
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={shortenUrl}>Shorten</button>
        </form>
        {/* box to display the shortened URL */}
        {shortenedUrl && (
          <div className="result">
            <p>{shortenedUrl}</p>
            {/* button to copy the shortened URL to clipboard */}
            <button onClick={copyToClipboard}>Copy</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
