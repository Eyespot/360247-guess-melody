export default (segment) => {
  const container = document.createElement(`template`);
  container.innerHTML = segment;

  return container.content.children[0];
};
