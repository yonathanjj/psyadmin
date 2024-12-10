const qrCodeScanner = new Html5QrcodeScanner("qr-video", {
    fps: 10,
    qrbox: 250
});

let isScanning = false;

// Mock data for demonstration purposes
const mockTickets = {
    "123456": {
        ticketId: "123456",
        eventName: "Summer Concert 2024",
        ticketHolder: "John Doe",
        ticketStatus: "Paid"
    },
    "789101": {
        ticketId: "789101",
        eventName: "Winter Festival 2024",
        ticketHolder: "Jane Doe",
        ticketStatus: "Not Paid"
    }
};

// Function to fetch ticket details based on ticket ID
function getTicketDetails(ticketId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (mockTickets[ticketId]) {
                resolve(mockTickets[ticketId]);
            } else {
                reject("Ticket not found");
            }
        }, 500); // Simulate an API delay
    });
}

// Start scanning function
document.getElementById("start-scan").addEventListener("click", function() {
    if (!isScanning) {
        qrCodeScanner.start(
            { facingMode: "environment" }, // Using back camera
            {
                fps: 10,
                qrbox: 250
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
                }).catch(error => {
                    document.getElementById("status-text").textContent = "Error: " + error;
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

// Optional: Simulate clicking on a ticket in the list
document.querySelectorAll("#ticket-list li").forEach(ticketElement => {
    ticketElement.addEventListener("click", () => {
        const ticketId = ticketElement.getAttribute("data-ticket-id");
        console.log("Ticket ID clicked:", ticketId);
        getTicketDetails(ticketId).then(ticket => {
            document.getElementById("status-text").textContent = "Ticket Selected!";
            document.getElementById("event-name").textContent = ticket.eventName;
            document.getElementById("ticket-holder").textContent = ticket.ticketHolder;
            document.getElementById("ticket-status").textContent = ticket.ticketStatus;
        });
    });
});
