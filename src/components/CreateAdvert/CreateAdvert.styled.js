import styled from 'styled-components';
import { Form, Field } from 'formik';

export const Wrapper = styled(Form)`
  margin: 0 auto;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  border: 2px solid black;
  padding: 20px;
  gap: 10px;
  width: 300px;
`;

export const Text = styled.p`
  margin: 0;
`;

export const ErrorText = styled.p`
  margin: 0;
  color: red;
`;

export const Input = styled(Field)``;

export const Button = styled.button`
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  border-color: lightgray;
`;
