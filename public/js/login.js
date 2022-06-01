const login = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      // add a toast instead of using the alert.  Need to figure this one out still
      // bulmaToast.toast({ message: 'Hello There' });
      alert(response.statusText);
    }
  }
};

document.querySelector('#login-submit').addEventListener('click', login);

document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    login(event);
  }
});
