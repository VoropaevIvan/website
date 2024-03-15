export const isNewTask = (pathname) => {
  const id = pathname.split("/").reverse()[0];
  return !(!isNaN(Number(id)) && id);
};
export const curTaskId = (pathname) => {
  const id = pathname.split("/").reverse()[0];
  return Number(id);
};
