/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message on app load', () => {
    render(<App />);
    const linkElement = screen.getByText(/Welcome to Mine Sweeper/i);
    expect(linkElement).toBeInTheDocument();
});
