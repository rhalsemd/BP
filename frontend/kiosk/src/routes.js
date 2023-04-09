import KioskHomeContainer from './kiosk/routes/KioskHomeContainer'
import KioskRentContainer from './kiosk/routes/KioskRentContainer'
import KioskRentGuideContainer from './kiosk/routes/KioskRentGuideContainer'
import KioskRentCompleteContainer from './kiosk/routes/KioskRentCompleteContainer'
import KioskReturnContainer from './kiosk/routes/KioskReturnContainer'
import KioskReturnCameraContainer from './kiosk/routes/KioskReturnCameraContainer'
import KioskReturnGuideContainer from './kiosk/routes/KioskReturnGuideContainer'
import KioskReturnCompleteContainer from './kiosk/routes/KioskReturnCompleteContainer'
import KioskFixingContainer from './kiosk/routes/KioskFixingContainer'
import Home from './kiosk/routes/Home'

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/kiosk/:id',
    element: <KioskHomeContainer />
  },
  {
    path: '/kiosk/:id/rent',
    element: <KioskRentContainer />
  },
  {
    path: '/kiosk/:id/rent/guide/:holderNum',
    element: <KioskRentGuideContainer />
  },
  {
    // 정상적으로 대여가 되지 않았습니다. 
    path: '/kiosk/:id/rent/complete/:holderNum/:isBrolly',
    element: <KioskRentCompleteContainer />
  },
  {
    path: '/kiosk/:id/return',
    element: <KioskReturnContainer />
  },
  {
    path: '/kiosk/:id/return/camera',
    element: <KioskReturnCameraContainer />
  },
  {
    path: '/kiosk/:id/return/guide/:holderNum',
    element: <KioskReturnGuideContainer />
  },
  {
    path: '/kiosk/:id/return/complete/:holderNum/:isBrolly',
    element: <KioskReturnCompleteContainer />
  },
  {
    path: '/*',
    element: <KioskFixingContainer />
  },
]

export default routes;