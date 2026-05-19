import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import JobBoard from './JobBoard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JobBoard />
  </StrictMode>
);
