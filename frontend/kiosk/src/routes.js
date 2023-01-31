import KioskHomeContainer from './kiosk/routes/KioskHomeContainer'
import KioskLentContainer from './kiosk/routes/KioskLentContainer'
import KioskLentCompleteContainer from './kiosk/routes/KioskLentCompleteContainer'
import KioskReturnContainer from './kiosk/routes/KioskReturnContainer'
import KioskReturnQRContainer from './kiosk/routes/KioskReturnQRContainer'
import KioskReturnCameraContainer from './kiosk/routes/KioskReturnCameraContainer'
import KioskReturnGuideContainer from './kiosk/routes/KioskReturnGuideContainer'
import KioskReturnCompleteContainer from './kiosk/routes/KioskReturnCompleteContainer'

const routes = [
  {
    path: '/kiosk',
    element: <KioskHomeContainer/>
  },
  {
    path: '/kiosk/lent',
    element: <KioskLentContainer/>
  },
  {
    path: '/kiosk/lent/complete',
    element: <KioskLentCompleteContainer/>
  },
  {
    path: '/kiosk/return',
    element: <KioskReturnContainer/>
  },
  {
    path: '/kiosk/return/QR',
    element: <KioskReturnQRContainer/>
  },
  {
    path: '/kiosk/return/camera',
    element: <KioskReturnCameraContainer/>
  },
  {
    path: '/kiosk/return/guide',
    element: <KioskReturnGuideContainer/>
  },
  {
    path: '/kiosk/return/complete',
    element: <KioskReturnCompleteContainer/>
  },
]

export default routes;