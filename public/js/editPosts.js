const editPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#postTitle').value.trim();
  const body = document.querySelector('#postBody').value.trim();
  const id = event.target.getAttribute('data-id');
  if (title && body) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const deletePost = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

const cancelEdit = async (event) => {
  event.preventDefault();

  document.location.replace('/dashboard');
};

document.querySelector('#edit-post-submit').addEventListener('click', editPost);
document
  .querySelector('#delete-post-submit')
  .addEventListener('click', deletePost);
document
  .querySelector('#cancel-post-submit')
  .addEventListener('click', cancelEdit);
