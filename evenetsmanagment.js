// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const editPopup = document.getElementById('edit-popup');
  const editButtons = document.querySelectorAll('.edit-btn');
  const cancelBtn = document.querySelector('.cancel-btn');

  // Open popup on Edit button click
  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      editPopup.style.display = 'flex';
    });
  });

  // Close popup on Cancel button click
  cancelBtn.addEventListener('click', () => {
    editPopup.style.display = 'none';
  });

  // Save changes (for demonstration)
  const editForm = document.getElementById('edit-event-form');
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Changes saved!');
    editPopup.style.display = 'none';
  });
});
