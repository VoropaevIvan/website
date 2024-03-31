const sortFunction = (tasks, sortingKey) => {
  if (sortingKey === "Сначала новые") {
    tasks.sort((a, b) => {
      return -(a.id - b.id);
    });
  }

  return tasks;
};
export default sortFunction;
