import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.scss';

  createRoot(document.querySelector(
    '#fromjs'
  )).render(<h1>Hello from index.js</h1>);