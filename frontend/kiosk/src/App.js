import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css"
import routes from './routes'
import { Global, css } from '@emotion/react'

function App() {

  return (
    <div className="App">
      <Global
        styles={css`
          * {
            color: #404040 !important;
          }
        `}
      />

      <Router>
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.element
                  }
                />
              );
            })}
          </Routes>
      </Router>
    </div>
  );
}

export default App;
