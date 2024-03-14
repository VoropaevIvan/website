const sortFunction = (tasks, sortingKey) => {
  if (sortingKey === "data") {
    tasks.sort((a, b) => {
      return -(a.id - b.id);
    });
  }

  return tasks;
};
export default sortFunction;
