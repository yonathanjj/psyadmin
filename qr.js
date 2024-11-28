<script src="https://unpkg.com/html5-qrcode/minified/html5-qrcode.min.js"></script>
<script>
  const qrCodeScanner = new Html5QrcodeScanner("qr-video", {
    fps: 10,
    qrbox: 250
  });

  let isScanning = false;

  // Mock data for demonstration purposes
  const mockEventData = {
    ticketId: "123456",
    eventName: "Summer Concert 2024",
    ticketHolder: "John Doe",
    ticketStatus: "Paid" // Other statuses could be: "Not Paid", "Expired"
  };

  // Function to fetch ticket details (simulated)
  function getTicketDetails(ticketId) {
    // Normally, you would make a fetch request to your backend to get this data
    // Example: fetch(`/api/ticket/${ticketId}`)
    // For now, we'll use the mock data above
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockEventData); // Returning mock event data
      }, 500); // Simulate a delay like an API call
    });
  }

  // Start scanning function
  document.getElementById("start-scan").addEventListener("click", function() {
    if (!isScanning) {
      qrCodeScanner.start(
        { facingMode: "environment" }, // Using back camera
        {
          fps: 10,  // frames per second
          qrbox: 250  // size of the QR scanning area
        },
        (decodedText, decodedResult) => {
          // Simulating a successful scan of ticketId
          console.log(decodedText); // This would be the ticket ID or unique code

          // Get ticket details based on the QR code (ticket ID)
          getTicketDetails(decodedText).then(ticket => {
            // Update the UI with event and ticket info
            document.getElementById("status-text").textContent = "Ticket Scanned!";
            document.getElementById("event-name").textContent = ticket.eventName;
            document.getElementById("ticket-holder").textContent = ticket.ticketHolder;
            document.getElementById("ticket-status").textContent = ticket.ticketStatus;
          });
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
      document.getElementById("start-scan").textContent = "Stop Scanning";
      isScanning = true;
    } else {
      qrCodeScanner.stop();
      document.getElementById("start-scan").textContent = "Start Scanning";
      isScanning = false;
      document.getElementById("status-text").textContent = "Scanning stopped";
      document.getElementById("ticket-info").innerHTML = `
        <p><strong>Event:</strong> N/A</p>
        <p><strong>Ticket Holder:</strong> N/A</p>
        <p><strong>Ticket Status:</strong> Not Scanned</p>
      `;
    }
  });
</script>
