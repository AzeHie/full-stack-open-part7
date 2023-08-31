import Proptypes from 'prop-types';

import './Notification.css';

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <div className="notification">
      <p>{notification}</p>
    </div>
  )
}

Notification.propTypes = {
  notification: Proptypes.string.isRequired,
}

export default Notification;