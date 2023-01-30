import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import KioskHome from './kiosk/routes/KioskHome'
import KioskLent from './kiosk/routes/KioskLent'
import KioskLentComplete from './kiosk/routes/KioskLentComplete'
import KioskReturn from './kiosk/routes/KioskReturn'
import KioskReturnComplete from './kiosk/routes/KioskReturnComplete'
import KioskReturnCamera from './kiosk/routes/KioskReturnCamera'
import KioskReturnQRView from './kiosk/routes/KioskReturnQRCheck'
import KioskReturnGuide from './kiosk/routes/KioskReturnGuide'
import "./App.css"
import { Global, css } from '@emotion/react'

function App() {
  return (
    <div className="App">
      <Global
        styles={css`
          * {
            color: blue !important;
          }
        `}
      />

      <Router>
        <Routes>
          <Route path='/kiosk' exact element={<KioskHome />}></Route>
          <Route path='/kiosk/lent' element={<KioskLent />}></Route>
          <Route path='/kiosk/lent/complete' element={<KioskLentComplete />}></Route>
          <Route path='/kiosk/return' element={<KioskReturn />}></Route>
          <Route path='/kiosk/return/QR' element={<KioskReturnQRView />}></Route>
          <Route path='/kiosk/return/camera' element={<KioskReturnCamera />}></Route>
          <Route path='/kiosk/return/guide' element={<KioskReturnGuide />}></Route>
          <Route path='/kiosk/return/complete' element={<KioskReturnComplete />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
