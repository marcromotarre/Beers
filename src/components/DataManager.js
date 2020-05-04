import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Loader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = styled.div`
  background-color: red;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    font-family: 'HelveticaNeue-Thin';
    color: #ffffff;
    font-size: 15px;
  }
`;
const DataManager = ({ children }) => {
  const { error, pending } = useSelector((state) => state.beersReducer);
  return (
    <>
      {pending && (
        <Loader>
          <img
            alt="loading"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          />
        </Loader>
      )}
      {!pending && error && (
        <Error>
          <label>Error Loading Data</label>
        </Error>
      )}
      {!pending && !error && <>{children}</>}
    </>
  );
};

export default DataManager;
