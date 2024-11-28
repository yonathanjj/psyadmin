// Event management functionality (Add, Edit, Delete)
document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const image = document.getElementById('event-image').files[0];
    const name = document.getElementById('event-name').value;
    const place = document.getElementById('event-place').value;
    const time = document.getElementById('event-time').value;
    const price = document.getElementById('ticket-price').value;

    const eventItem = document.createElement('li');
    eventItem.classList.add('event-item');
    eventItem.innerHTML = `
        <img src="${URL.createObjectURL(image)}" alt="Event Image" />
        <div class="event-details">
            <h3>${name}</h3>
            <p>Place: ${place}</p>
            <p>Time: ${new Date(time).toLocaleString()}</p>
            <p>Price: $${price}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Add event item to the list
    document.getElementById('event-items').appendChild(eventItem);

    // Reset form after adding
    document.getElementById('event-form').reset();
});

// Handle Delete button
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.closest('.event-item').remove();
    }
});

// Handle Edit button (This could open a modal with the current event data for editing)
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const eventItem = event.target.closest('.event-item');
        const eventName = eventItem.querySelector('h3').innerText;
        alert(`Editing: ${eventName}`);
        // Implement edit functionality here (e.g., populate form with current data)
    }
});
