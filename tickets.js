document.addEventListener("DOMContentLoaded", function () {
    // Sample ticket data
    let tickets = [
        { id: 1, event: "Music Fest 2024", status: "Sold", date: "2024-11-30", price: 100, title: "Music Fest", subtitle: "Live Concert", place: "Stadium" },
        { id: 2, event: "Art Expo", status: "Available", date: "2024-12-05", price: 50, title: "Art Expo", subtitle: "Modern Art", place: "Art Gallery" },
        { id: 3, event: "Jazz Night", status: "Sold", date: "2024-11-28", price: 80, title: "Jazz Night", subtitle: "Smooth Jazz", place: "Club" },
        { id: 4, event: "Rock Concert", status: "Available", date: "2024-11-27", price: 120, title: "Rock Concert", subtitle: "Live Rock Music", place: "Arena" },
        { id: 5, event: "Theater Play", status: "Cancelled", date: "2024-12-15", price: 150, title: "Theater Play", subtitle: "Broadway", place: "Theater" }
    ];

    // DOM Elements
    const ticketItemsContainer = document.getElementById("ticket-items");
    const searchBox = document.getElementById("search-box");
    const filterDropdown = document.getElementById("filter-dropdown");
    const addTicketForm = document.getElementById("add-ticket-form");
    const editTicketModal = document.getElementById("edit-ticket-modal");
    const closeModal = document.getElementById("close-modal");
    const editTicketForm = document.getElementById("edit-ticket-form");

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
                <p><strong>Price:</strong> $${ticket.price}</p>
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
                const ticket = tickets.find(t => t.id == ticketId);
                openEditModal(ticket);
            });
        });

        document.querySelectorAll(".delete-ticket").forEach(button => {
            button.addEventListener("click", function () {
                const ticketId = this.dataset.id;
                const ticketIndex = tickets.findIndex(t => t.id == ticketId);
                if (ticketIndex !== -1) {
                    tickets.splice(ticketIndex, 1);
                    renderTicketList(tickets); // Re-render the ticket list
                }
            });
        });
    }

    // Function to open the edit modal
    function openEditModal(ticket) {
        editTicketModal.style.display = "block";
        document.getElementById("edit-event-name").value = ticket.event;
        document.getElementById("edit-ticket-status").value = ticket.status;
        document.getElementById("edit-event-date").value = ticket.date;
        document.getElementById("edit-price").value = ticket.price;
        document.getElementById("edit-title").value = ticket.title;
        document.getElementById("edit-subtitle").value = ticket.subtitle;
        document.getElementById("edit-place").value = ticket.place;
        editTicketForm.dataset.ticketId = ticket.id;
    }

    // Function to close the modal
    closeModal.addEventListener("click", function () {
        editTicketModal.style.display = "none";
    });

    // Handle editing a ticket
    editTicketForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const ticketId = editTicketForm.dataset.ticketId;
        const updatedTicket = {
            id: ticketId,
            event: document.getElementById("edit-event-name").value,
            status: document.getElementById("edit-ticket-status").value,
            date: document.getElementById("edit-event-date").value,
            price: document.getElementById("edit-price").value,
            title: document.getElementById("edit-title").value,
            subtitle: document.getElementById("edit-subtitle").value,
            place: document.getElementById("edit-place").value
        };

        const ticketIndex = tickets.findIndex(t => t.id == ticketId);
        if (ticketIndex !== -1) {
            tickets[ticketIndex] = updatedTicket;
            renderTicketList(tickets);
            editTicketModal.style.display = "none";
        }
    });

    // Handle adding a new ticket
    addTicketForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newTicket = {
            id: tickets.length + 1,
            event: document.getElementById("event-name").value,
            status: document.getElementById("ticket-status").value,
            date: document.getElementById("event-date").value,
            price: 0, // Placeholder price
            title: "New Event", // Placeholder title
            subtitle: "Subtitle", // Placeholder subtitle
            place: "Place" // Placeholder place
        };

        tickets.push(newTicket);
        renderTicketList(tickets);
    });

    // Handle searching and filtering tickets
    searchBox.addEventListener("input", function () {
        const searchText = searchBox.value.toLowerCase();
        const filteredTickets = tickets.filter(ticket => ticket.event.toLowerCase().includes(searchText));
        renderTicketList(filteredTickets);
    });

    filterDropdown.addEventListener("change", function () {
        const status = filterDropdown.value;
        const filteredTickets = tickets.filter(ticket => (status === "all" || ticket.status.toLowerCase() === status));
        renderTicketList(filteredTickets);
    });

    renderTicketList(tickets);
});
