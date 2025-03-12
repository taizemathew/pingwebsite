// Function to save URL
function saveURL(index) {
    localStorage.setItem(`url${index}`, document.getElementById(`url${index}`).value.trim());
    document.getElementById(`status${index}`).innerText = "URL saved successfully!";
}

// Function to ping URL
function pingURL(index) {
    const url = localStorage.getItem(`url${index}`);
    if (!url) {
        document.getElementById(`status${index}`).innerText = "No URL saved.";
        return;
    }
    const logContainer = document.getElementById(`log-container${index}`);
    fetch(url, { method: "GET", mode: "no-cors" })
        .then(() => {
            const timestamp = new Date().toLocaleTimeString() + ":" + new Date().getMilliseconds();
            const logEntry = document.createElement("div");
            logEntry.className = "log";
            logEntry.innerText = `${timestamp} - Pinged: ${url}`;
            logContainer.appendChild(logEntry);
            console.log(`Pinged ${url} at ${timestamp}`);
        })
        .catch(error => console.error(`Ping failed for ${url}:`, error));
}

// Function to start auto pinging every 5 minutes
function startAutoPing(index) {
    setInterval(() => pingURL(index), 300000); // 300,000 ms = 5 minutes
}

// Start auto ping for each URL when the page loads
window.onload = function() {
    for (let i = 1; i <= 5; i++) {
        startAutoPing(i);
    }
};
