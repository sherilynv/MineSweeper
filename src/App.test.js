/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
//import { axe } from 'jest-axe';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Mine Sweeper/i);
  expect(linkElement).toBeInTheDocument();
});

// describe('App', () => {
//   test('should not have accessibility violations', async () => {
//     const { container } = render(<Progress />);

//     expect(await axe(container)).toHaveNoViolations();
//   });
// });




/* eslint-disable no-undef */
// import React from 'react';
// import BoardSquare from './BoardSquare';
// import PropTypes from 'prop-types';

// BoardSquare.contextTypes = {
//     sound: PropTypes.bool,
//     updateBombs: PropTypes.func,
//     settings: PropTypes.object,
//     currentGame: PropTypes.object,
//   };

// it('renders results after search', () => {
//     const fetched = true;
//     const wrapper = shallow(<BoardSquare store={store} fetched={fetched} />);
//     expect(wrapper.find('Results').length).toEqual(1);
//   });