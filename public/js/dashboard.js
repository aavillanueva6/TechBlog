const cardContainer = document.querySelector('.customCardContainer');

cardContainer.addEventListener('click', (event) => {
  const id = event.target.closest('[data-id]').getAttribute('data-id');
  window.location.href = `/editpost/${id}`;
});
