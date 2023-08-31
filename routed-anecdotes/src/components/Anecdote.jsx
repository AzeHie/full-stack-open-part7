import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes, vote }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find(a => a.id === Number(id));
  return (
    <div>
      <h1>
      {anecdote.content} by {anecdote.author}
      </h1>
      <p>has {anecdote.votes} votes <button onClick={() => vote(id)}>vote</button></p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
};

Anecdote.propTypes = {
  anecdotes: PropTypes.any.isRequired,
  vote: PropTypes.func.isRequired
}

export default Anecdote;