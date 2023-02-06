import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css"
import routes from './routes'
import { Global, css } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { getKioskId } from './store'
import { useEffect } from 'react'

function App() {
  const totalURL = window.location.href;
  const urlSplit = totalURL.split("http://localhost:85/kiosk/");
  const id = urlSplit[1].split("/");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKioskId(id))
  }, [])

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
