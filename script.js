// This file is currently empty. 
// All the previous javascript was related to the old design.
// You can add new javascript here if needed. 

document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}); 