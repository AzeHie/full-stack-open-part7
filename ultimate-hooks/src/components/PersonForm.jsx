import { Fragment } from 'react';
import { PropTypes } from 'prop-types';

const PersonForm = ({ handlePersonSubmit, name, number, resetName, resetNumber }) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const newId = Math.floor(Math.random() * 100000);
    handlePersonSubmit({ id: newId, name: name.value, number: number.value });
    resetName();
    resetNumber();
  };

  return (
    <Fragment>
      <h2>persons</h2>
      <form onSubmit={onSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
    </Fragment>
  );
};

PersonForm.propTypes = {
  handlePersonSubmit: PropTypes.func.isRequired,
  name: PropTypes.object.isRequired,
  number: PropTypes.object.isRequired,
  resetName: PropTypes.func.isRequired,
  resetNumber: PropTypes.func.isRequired
};

export default PersonForm;
