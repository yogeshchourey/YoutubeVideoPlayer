import React from 'react';
import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import App from './App';
import { HomePage } from './pages/HomePage';
import { Route, MemoryRouter } from 'react-router-dom';

const renderHomePage = () =>
  render(
    <HomePage />
  );

/**
 * Test Case to ensure Home page with Video player is rendered
 */
test('Renders Home Page', () => {
  renderHomePage();
  expect(screen.getByText('Let us know a youtube video URL you wish to play.')).toBeDefined();
});

/**
 * Test Case to ensure that youtube url is added, and videoplayer plays the video
 */
test('Add Youtube URL', () => {
  renderHomePage();
  /**
   * Since we know the text, using the text, will find the input field to add youtube url
   */
  let urlInputField = screen.getByText('Let us know a youtube video URL you wish to play.');
  expect(urlInputField).toBeInTheDocument();

  /**
   * Trigger the change, to reflect new youtube url
   */
  fireEvent.change(urlInputField, { target: { value: 'https://www.youtube.com/watch?v=LmWxkMI-BpM' } });
  expect(urlInputField).toHaveValue('https://www.youtube.com/watch?v=LmWxkMI-BpM');
  
  /**
   * Trigger the play button to play the youtube video
   */
  let playButton = screen.getByText('Play');
  fireEvent.click(
    playButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );
})
