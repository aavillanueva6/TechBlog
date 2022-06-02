const login = async (event) => {
  event.preventDefault();
  await hideErrorMessage();

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
    } else if (response.status == 406) {
      showErrorMessage();
      console.log(response);
      document.querySelector('#login-password').value = '';
    } else {
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

const errorNotification = document.querySelector('#login-error-message');

async function hideErrorMessage() {
  errorNotification.classList.add('is-hidden');
}

function showErrorMessage() {
  errorNotification.classList.remove('is-hidden');
}

document
  .querySelector('#login-error-delete')
  .addEventListener('click', hideErrorMessage);

// document.addEventListener('DOMContentLoaded', () => {
//   (document.querySelectorAll('.notification .delete') || []).forEach(
//     ($delete) => {
//       const $notification = $delete.parentNode;

//       $delete.addEventListener('click', () => {
//         $notification.parentNode.removeChild($notification);
//       });
//     }
//   );
// });
