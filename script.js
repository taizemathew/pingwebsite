document.getElementById("startPing").addEventListener("click", () => {
    const urls = [
        document.getElementById("url1").value,
        document.getElementById("url2").value,
        document.getElementById("url3").value,
        document.getElementById("url4").value,
        document.getElementById("url5").value
    ].filter(url => url.trim() !== ""); // Remove empty URLs

    function pingUrls() {
        const logContainer = document.getElementById("logContainer");
        const timestamp = new Date().toLocaleTimeString();

        urls.forEach(url => {
            fetch(url)
                .then(response => {
                    const status = response.ok ? "✅ Success" : "❌ Failed";
                    logContainer.innerHTML += `<p><b>${timestamp}</b> - Pinged: <a href="${url}" target="_blank">${url}</a> - ${status}</p>`;
                })
                .catch(() => {
                    logContainer.innerHTML += `<p><b>${timestamp}</b> - Pinged: <a href="${url}" target="_blank">${url}</a> - ❌ Failed</p>`;
                });
        });

        // Auto-scroll to the latest log entry
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    // Start Pinging Every 5 Minutes (300,000 ms)
    pingUrls(); // First immediate ping
    setInterval(pingUrls, 300000);
});
