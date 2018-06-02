export default (segment) => {
  const container = document.createElement(`div`);
  container.innerHTML = segment;

  return container.children[0];
};
