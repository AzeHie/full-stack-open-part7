import { useField } from './hooks/useField';
import { useResource } from './hooks/useResource';
import NoteForm from './components/NoteForm';
import PersonForm from './components/PersonForm';

const App = () => {
  const {fields: content, reset: resetContent } = useField('text');
  const {fields: name, reset: resetName } = useField('text');
  const {fields: number, reset: resetNumber } = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = (newContent) => {
    noteService.create(newContent);
  };

  const handlePersonSubmit = (newPerson) => {
    personService.create(newPerson);
  };

  return (
    <div>
      <NoteForm content={content} resetContent={resetContent} handleNoteSubmit={handleNoteSubmit} />
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <PersonForm name={name} number={number} resetName={resetName} resetNumber={resetNumber} handlePersonSubmit={handlePersonSubmit}/>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
