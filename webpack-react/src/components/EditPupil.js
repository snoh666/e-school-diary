import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {Redirect, Link} from 'react-router-dom';

const EditPupil = ({router, usersData, setNeedUpdate}) => {

  const [matchedPupil, setMatchedPupil] = useState({});
  const [isSaved, setIsSaved] = useState(true);
  // Grades states
  const [mathGrades, setMathGrades] = useState('');
  const [polishGrades, setPolishGrades] = useState('');
  const [itGrades, setItGrades] = useState('');

  useEffect(() => {
    if (usersData.length > 0) {
      setMatchedPupil(
        usersData.filter(
          pupil => pupil.id == Number(router.match.params.id),
        )[0],
      );
    }
  }, []);

  useEffect(() => {
    if (Object.keys(matchedPupil).length) {
      const {math, polish, it} = matchedPupil.grades;
      setMathGrades(math);
      setPolishGrades(polish);
      setItGrades(it);
    }
  }, [matchedPupil])


  const sendForm = e => {
    e.preventDefault();

    fetch('http://localhost/e-dziennik-sbd/api/pupil/edit/', {method: 'POST', body: JSON.stringify({
      'pupil_id': matchedPupil.id,
      grades: {
        math: mathGrades,
        polish: polishGrades,
        it: itGrades
      }
    })})
      .then(response => response.json())
      .then(value => {
        try {
          if (value.error) {
            throw value.error;
          } else if (value.message) {
            setIsSaved(true);
            setNeedUpdate(true);
          }

        } catch (err) {
          console.error(err);
        }
      });
  }

  const changedIsSaved = () => setIsSaved(false);

  return usersData.length ? (
    <Wrapper>
      <h2>Edit Pupil</h2>
      <p>{matchedPupil.fullname}</p>
      <form onSubmit={sendForm}>
        <label htmlFor="math">
          <span>Math:</span>
          <input
            type='text'
            name='math'
            id='math'
            onChange={e => { setMathGrades(e.target.value); changedIsSaved(); }}
            value={mathGrades}
          />
        </label>

        <label htmlFor="polish">
          <span>Polish:</span>
          <input
            type='text'
            name='polish'
            id='polish'
            onChange={e => { setPolishGrades(e.target.value); changedIsSaved(); }}
            value={polishGrades}
          />
        </label>

        <label htmlFor="it">
          <span>Informatics:</span>
          <input
            type='text'
            name='it'
            id="it"
            onChange={e => { setItGrades(e.target.value); changedIsSaved(); }}
            value={itGrades}
          />
        </label>

        <p>
          {isSaved ? (
            <button type='submit' disabled>
              Save
            </button>
          ) : (
              <button type='submit'>Save</button>
            )}
          <Link replace to='/'>Go Back</Link>
        </p>
      </form>
    </Wrapper>
  ) : (
    <Redirect exact to='/' />
  );
};

export default EditPupil;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;

  button:not(:disabled) {
    border-bottom: 1px solid ${props => props.theme.black}
  }
`;