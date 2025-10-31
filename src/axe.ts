import React from 'react';
import ReactDOM from 'react-dom';
import axe from '@axe-core/react';

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  axe(React, ReactDOM, 1000, {
    rules: [
    ],
  });
}