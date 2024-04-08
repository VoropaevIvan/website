import "./TableForTopUsers.css";

const TableForTopUsers = ({ title, users }) => {
  return (
    <table className="tablefortopusers">
      <caption>{title}</caption>
      <thead>
        <tr>
          <th scope="col">Место</th>
          <th scope="col">Имя Фамилия</th>
          <th scope="col">Баллы</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, ind) => {
          return (
            <tr key={ind} className={user.isCurrentUser ? "curuser " : " "}>
              <td>{user.position}</td>
              <td>{user.name + " " + user.surname}</td>
              <td>{user.balls}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableForTopUsers;
