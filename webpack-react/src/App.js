import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Pupil from './components/Pupil';
import styled from 'styled-components';

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
    <Router basename="/e-dziennik-sbd/admin.php">
      <Switch>
        <Route path="/">
          <Wrapper>
            {data.length > 0
              ? data.map(pupil => <Pupil key={pupil.id} {...pupil} />)
              : "Loading..."}
          </Wrapper>
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