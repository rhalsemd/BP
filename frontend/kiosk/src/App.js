import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css"
import routes from './routes'
import { Global, css } from '@emotion/react'
import { cloneElement } from 'react';

function App() {
  return (
    <div className="App">
      <Global
        styles={css`
          * {
            color: #404040 !important;
          }
          body {
            overflow: hidden;
          }
        `}
      />

      <Router>
        <Routes>
          {routes.map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                element={cloneElement(route.element, { isVisible: true })}
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
