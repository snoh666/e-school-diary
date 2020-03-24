import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import Pupil from './components/Pupil';
import styled, { ThemeProvider } from 'styled-components';
import AddPupil from './components/AddPupil';
import EditPupil from './components/EditPupil';

const App = () => {

  const [data, setData] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(true);

  useEffect(() => {
    if (needUpdate) {
      fetch('http://localhost/e-dziennik-sbd/api/')
        .then(response => response.json())
        .then(value => {
          try {
            if (value.error) {
              throw err;
            }
            setData(value);
            setNeedUpdate(false);
          } catch (err) {
            console.error('Occured error', err);
          }
        });
    }
  }, [needUpdate]);

  const themeSettings = {
    blue: '#3E50B4',
    lightBlue: '#3E50B4',
    darkBlue: '#283999',
    white: '#ffffff',
    whiteAlpha: 'rgba(255, 255,255, .67)',
    cyan: '#60E9FE',
    materialIcon: '#E0E0E0',
    blackAlpha: 'rgba(0, 0,0, .8)',
    black: '#000000',
  }

  return (
    <ThemeProvider theme={themeSettings}>
      <SiteWrapper>
        <Router>
          <Switch>
            <Route exact path='/'>
              <PupilsWrapper>
                <PupilsTitle>
                  <h2>Pupils</h2>
                  <Link replace to='/user/add'>
                    Add new pupil
                </Link>
                </PupilsTitle>
                <PupilsContent>
                  {data.length > 0
                    ? data.map(pupil => <Pupil key={pupil.id} {...pupil} />)
                    : 'Loading...'}
                </PupilsContent>
              </PupilsWrapper>
            </Route>
            <Route exact path='/user/add'>
              <AddPupil pupils={data} setNeedUpdate={setNeedUpdate} />
            </Route>

            <Route
              exact
              path='/user/edit/:id'
              render={props => (
                <EditPupil
                  router={props}
                  usersData={data}
                  setNeedUpdate={setNeedUpdate}
                />
              )}
            />
          </Switch>
        </Router>
      </SiteWrapper>
    </ThemeProvider>
  );
};

export default App;

const SiteWrapper = styled.div`
  width: 100%;
  a,
  button {
    color: inherit;
    text-decoration: none;
    padding: .2rem 2rem;

    transition: transform .3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const PupilsWrapper = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 15px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);

  overflow: hidden;
  a {
    padding: 0;
  }
`;

const PupilsTitle = styled.div`
  width: 100%;
  padding: 30px 15px;

  background-color: ${props => props.theme.darkBlue};
  color: ${props => props.theme.white};

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 1rem;
    font-weight: 300;
  }
`;

const PupilsContent = styled.div`
  width: 100%;
`;