import { Link } from 'react-router-dom';

import './Userslist.css';

const UsersList = ({ users }) => {
  return (
    <div className='UsersList__container'>
      <table>
        <thead>
          <tr>
            <th />
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {' '}
                <Link className='UsersList__link' to={`/users/${user.id}`}>{user.name} </Link>
              </td>
              <td className='UsersList__td2'>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
