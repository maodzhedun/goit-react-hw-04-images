import React from 'react';
import {ButtonMore} from "./Button.styled";

const Button = ({ onClick }) => {
  return (
    <ButtonMore type="button" onClick={onClick}>
      Load more
    </ButtonMore>
  );
};

export default Button;
