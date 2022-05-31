const newPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#newPostTitle').value.trim();
  const body = document.querySelector('#newPostBody').value.trim();

  console.log(title, body);
  if (title && body) {
    const response = await fetch('/api/posts', {
      method: 'POST',
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

document.querySelector('#createPostSubmit').addEventListener('click', newPost);
