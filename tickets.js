document.addEventListener("DOMContentLoaded", function () {

  // Sample ticket data
  let tickets = [
    { id: 1, event: "Music Fest 2024", status: "Sold", date: "2024-11-30" },
    { id: 2, event: "Art Expo", status: "Available", date: "2024-12-05" },
    { id: 3, event: "Jazz Night", status: "Sold", date: "2024-11-28" },
    { id: 4, event: "Rock Concert", status: "Available", date: "2024-11-27" },
    { id: 5, event: "Theater Play", status: "Cancelled", date: "2024-12-15" },
  ];

  // DOM Elements
  const ticketItemsContainer = document.getElementById("ticket-items");
  const searchBox = document.getElementById("search-box");
  const filterDropdown = document.getElementById("filter-dropdown");
  const addTicketForm = document.getElementById("add-ticket-form");

  // Function to render tickets
  function renderTicketList(tickets) {
    ticketItemsContainer.innerHTML = "";
    tickets.forEach(ticket => {
      const ticketItem = document.createElement("li");
      ticketItem.classList.add("ticket-item");
      ticketItem.innerHTML = `
        <p><strong>Event:</strong> ${ticket.event}</p>
        <p><strong>Status:</strong> ${ticket.status}</p>
        <p><strong>Date:</strong> ${ticket.date}</p>
        <div class="ticket-actions">
          <button class="edit-ticket" data-id="${ticket.id}">Edit</button>
          <button class="delete-ticket" data-id="${ticket.id}">Delete</button>
        </div>
      `;
      ticketItemsContainer.appendChild(ticketItem);
    });

    // Event listeners for edit and delete buttons
    document.querySelectorAll(".edit-ticket").forEach(button => {
      button.addEventListener("click", function () {
        const ticketId = this.dataset.id;
        alert(`Edit ticket with ID: ${ticketId}`);
      });
    });

    document.querySelectorAll(".delete-ticket").forEach(button => {
      button.addEventListener("click", function () {
        const ticketId = this.dataset.id;
        const ticketIndex = tickets.findIndex(ticket => ticket.id == ticketId);
        tickets.splice(ticketIndex, 1); // Remove ticket
        renderTicketList(tickets); // Re-render list
      });
    });
  }

  // Function to filter tickets by status
  function filterTicketsByStatus(status) {
    if (status === "all") return tickets;
    return tickets.filter(ticket => ticket.status.toLowerCase() === status.toLowerCase());
  }

  // Event listener for search box
  searchBox.addEventListener("input", function () {
    const query = searchBox.value.toLowerCase();
    const filteredTickets = tickets.filter(ticket => ticket.event.toLowerCase().includes(query));
    renderTicketList(filteredTickets);
  });

  // Event listener for filter dropdown
  filterDropdown.addEventListener("change", function () {
    const status = filterDropdown.value;
    const filteredTickets = filterTicketsByStatus(status);
    renderTicketList(filteredTickets);
  });

  // Add ticket form submission
  addTicketForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const eventName = document.getElementById("event-name").value;
    const ticketStatus = document.getElementById("ticket-status").value;
    const eventDate = document.getElementById("event-date").value;

    // Create new ticket
    const newTicket = {
      id: tickets.length + 1, // Simple ID generation
      event: eventName,
      status: ticketStatus,
      date: eventDate,
    };

    // Add new ticket to the tickets array
    tickets.push(newTicket);
    renderTicketList(tickets); // Re-render the ticket list

    // Reset the form
    addTicketForm.reset();
  });

  // Initial render of all tickets
  renderTicketList(tickets);
});
