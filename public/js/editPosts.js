const editPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#postTitle').value.trim();
  const body = document.querySelector('#postBody').value.trim();

  if (title && body) {
    const response = await fetch(`/api/users/${id}`, {
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
  console.log(id);
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#edit-post-submit').addEventListener('click', editPost);
document
  .querySelector('#delete-post-submit')
  .addEventListener('click', deletePost);
