import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import Pupil from './components/Pupil';
import styled from 'styled-components';
import AddPupil from './components/AddPupil';
import EditPupil from './components/EditPupil';

const App = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost/e-dziennik-sbd/api/')
      .then(response => response.json())
      .then(value => {
        try {
          if (value.error) {
            throw err;
          }
          setData(value);
        } catch (err) {
          console.error('Occured error', err);
        }
      })
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PupilsWrapper>
            {data.length > 0
              ? data.map(pupil => <Pupil key={pupil.id} {...pupil} />)
              : "Loading..."}
          </PupilsWrapper>
          <Link to="/user/add">Add new pupil</Link>
        </Route>
        <Route exact path="/user/add">
          <AddPupil pupils={data} />
        </Route>

        <Route exact path="/user/edit/:id" component={props => <EditPupil router={props} usersData={data} />}/>

      </Switch>
    </Router>
  );
};

export default App;

const PupilsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  a {
    color: inherit;
    text-decoration: none;

    transition: transform .3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &:hover {
      transform: scaleX(1.05);
  }
`;