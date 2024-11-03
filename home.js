// home.js

// Check if the user is logged in
const isLoggedIn = localStorage.getItem('isLoggedIn');
const loggedInUser = localStorage.getItem('loggedInUser');

if (isLoggedIn) {
    document.getElementById('auth-buttons').style.display = 'none';
    const profileButton = document.getElementById('profileButton');
    const logoutButton = document.getElementById('logoutButton');

    profileButton.style.display = 'inline';
    profileButton.innerText = `Welcome, ${loggedInUser}`; // Update button text with username

    // Show the logout button
    logoutButton.style.display = 'inline';

    // Logout functionality
    logoutButton.onclick = function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedInUser');
        window.location.reload(); // Reload the page to update UI
    };
}

document.getElementById('profileButton').onclick = function() {
    // Redirect to the profile page
    window.location.href = 'profile.html'; // Update with your profile page URL
};
