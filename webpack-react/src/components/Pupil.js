import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Pupil = ({id, fullname, grades}) => {

  return (
    <Link replace to={`/user/edit/${id}`} style={{width: '100%'}}>
      <PupilWrapper>
        <FullName>
          <h5>{fullname}</h5>
        </FullName>
        <Grades>
          <div className="grades__math">
            Math: {grades.math}
          </div>
          <div className="grades__polish">
            Polish: {grades.polish}
          </div>
          <div className="grades__informatics">
            Informatics: {grades.informatics}
          </div>
        </Grades>
      </PupilWrapper>
    </Link>
  );
};

export default Pupil;

const PupilWrapper = styled.div`
  width: 100%;
  min-height: 2rem;
  margin: 10px 0;
  padding: .5rem 1rem;

  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: flex-start;

  border-bottom: 1px solid ${props => props.theme.materialIcon};
  color: ${props => props.theme.black};
`;

const FullName = styled.div`
  width: 250px;
  max-width: 30%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  h5{
    font-size: 1rem;
  }
`;

const Grades = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  div {
    padding: .5rem;
  }
`;