import PropTypes from 'prop-types';

const AnecdoteList = ({ anecdotes }) => {
  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>{anecdote.content}</li>
      ))}
    </ul>
  </div>
  )
};

AnecdoteList.propTypes = {
  anecdotes: PropTypes.any.isRequired,
}

export default AnecdoteList;