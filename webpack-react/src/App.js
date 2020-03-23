import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import Pupil from './components/Pupil';
import styled from 'styled-components';
import AddUser from './components/AddPupil';

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
          <Wrapper>
            {data.length > 0
              ? data.map(pupil => <Pupil key={pupil.id} {...pupil} />)
              : "Loading..."}
          </Wrapper>
          <Link to="/user/add">Add new pupil</Link>
        </Route>
        <Route exact path="/user/add">
          <AddPupil pupils={data} />
        </Route>
        <Route exact path="/user/edit/:id">

        </Route>
      </Switch>
    </Router>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;