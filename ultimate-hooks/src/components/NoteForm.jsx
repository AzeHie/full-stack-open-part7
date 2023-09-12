import { Fragment } from 'react';
import PropTypes from 'prop-types';

const NoteForm = ({ content, resetContent, handleNoteSubmit }) => {

  const onSubmit = (event) => {
    event.preventDefault();

    const newId = Math.floor(Math.random() * 100000);
    handleNoteSubmit({ id: newId, content: content.value });
    resetContent();
  };

  return (
    <Fragment>
      <h2>notes</h2>
      <form onSubmit={onSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
    </Fragment>
  );
};

NoteForm.propTypes = {
  content: PropTypes.object.isRequired,
  resetContent: PropTypes.func.isRequired,
  handleNoteSubmit: PropTypes.func.isRequired
}

export default NoteForm;
