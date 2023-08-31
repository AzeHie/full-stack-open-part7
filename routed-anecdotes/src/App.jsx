import { Fragment, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AnecdoteList from './components/AnecdoteList';
import About from './components/About';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Anecdote from './components/Anecdote';
import Notification from './components/Notification';

const App = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`A new anecdote "${anecdote.content}" added`);
    setTimeout(() => {
      setNotification('');
    }, 5000);
    navigate('/');
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(Number(id));

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === Number(id) ? voted : a)));
  };

  return (
    <Fragment>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>

      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path='/anecdotes/:id'
          element={<Anecdote anecdotes={anecdotes} vote={vote} />}
        />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/about' element={<About />} />
      </Routes>

      <Footer />
    </Fragment>
  );
};

export default App;
