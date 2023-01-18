import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import KioskHome from './kiosk/routes/KioskHome'
import KioskLent from './kiosk/routes/KioskLent'
// import PaymentQR from './kiosk/components/QR/PaymentQR'
import KioskLentComplete from './kiosk/routes/KioskLentComplete'
import KioskReturn from './kiosk/routes/KioskReturn'
import KioskReturnReceipt from './kiosk/routes/KioskReturnReceipt'
import KioskReturnComplete from './kiosk/routes/KioskReturnComplete'
import KioskReturnCamera from './kiosk/routes/KioskReturnCamera'
import KioskReturnCameraCheck from './kiosk/routes/KioskReturnCameraCheck'
import KioskLatLon from './kiosk/components/latloncomponents/LatLon'
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
          <Route path='/' exact element={<KioskHome />}></Route>
          <Route path='/kiosk/lent' element={<KioskLent />}></Route>
          {/* <Route path='/kiosk/lent/qrcode' element={<PaymentQR />}></Route> */}
          <Route path='/kiosk/lent/complete' element={<KioskLentComplete />}></Route>
          <Route path='/kiosk/return' element={<KioskReturn />}></Route>
          <Route path='/kiosk/return/camera' element={<KioskReturnCamera />}></Route>
          <Route path='/kiosk/return/camera/check' element={<KioskReturnCameraCheck />}></Route>
          <Route path='/kiosk/return/receipt' element={<KioskReturnReceipt />}></Route>
          <Route path='/kiosk/return/complete' element={<KioskReturnComplete />}></Route>
          <Route path='/kiosk/latlon' element={<KioskLatLon />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
