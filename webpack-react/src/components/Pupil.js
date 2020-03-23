import React from 'react';
import styled from 'styled-components';

const Pupil = ({id, fullname, grades}) => {

  console.log(grades);

  return (
    <PupilWrapper>
      <FullName>
        {fullname}
      </FullName>
      <Grades>
        <div className="grades__math">
          {grades.math}
        </div>
        <div className="grades__polish">
          {grades.polish}
        </div>
        <div className="grades__informatics">
          {grades.informatics}
        </div>
      </Grades>
    </PupilWrapper>
  );
};

export default Pupil;

const PupilWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid white;
`;

const FullName = styled.div`
  width: 200px;
  max-width: 20%;
  border-right: 1px solid white;
`;

const Grades = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  div {
    border-right: 1px solid white;
  }

  &:last-child {
    border-right: none;
  }
`;