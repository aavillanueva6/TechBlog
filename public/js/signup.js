const signup = async (event) => {
  event.preventDefault();
  await hideErrorMessages();

  const username = document.querySelector('#signup-username').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else if (response.status == 409) {
      console.log(response);
      showErrorMessageUser();
    } else if (response.status === 406) {
      console.log(response);
      document.querySelector('#signup-password').value = '';
      showErrorMessagePass();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#signup-submit').addEventListener('click', signup);

document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    signup(event);
  }
});

const errorNotificationUser = document.querySelector('#signup-error-user');
const errorNotificationPass = document.querySelector('#signup-error-pass');

async function hideErrorMessages() {
  errorNotificationUser.classList.add('is-hidden');
  errorNotificationPass.classList.add('is-hidden');
}

function showErrorMessageUser() {
  errorNotificationUser.classList.remove('is-hidden');
}
function showErrorMessagePass() {
  errorNotificationPass.classList.remove('is-hidden');
}

document
  .querySelector('#user-error-delete')
  .addEventListener('click', hideErrorMessages);
document
  .querySelector('#pass-error-delete')
  .addEventListener('click', hideErrorMessages);
