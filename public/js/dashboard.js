const cardContainer = document.querySelector('.customCardContainer');

cardContainer.addEventListener('click', (event) => {
  const target = event.target;
  const dataIdDiv = target.closest('[data-id]');
  const id = dataIdDiv.getAttribute('data-id');

  console.log(target);
  console.log(event);
  console.log(id);
  window.location.href = `/editpost/${id}`;
});
