import KioskHomeContainer from './kiosk/routes/KioskHomeContainer'
import KioskRentContainer from './kiosk/routes/KioskRentContainer'
import KioskRentCompleteContainer from './kiosk/routes/KioskRentCompleteContainer'
import KioskReturnContainer from './kiosk/routes/KioskReturnContainer'
import KioskReturnCameraContainer from './kiosk/routes/KioskReturnCameraContainer'
import KioskReturnGuideContainer from './kiosk/routes/KioskReturnGuideContainer'
import KioskReturnCompleteContainer from './kiosk/routes/KioskReturnCompleteContainer'
import KioskFixingContainer from './kiosk/routes/KioskFixingContainer'
import SpeechButton from './kiosk/components/tts/SpeechButton'

const routes = [
  {
    path: '/kiosk/:id',
    element: <KioskHomeContainer />
  },
  {
    path: '/kiosk/:id/rent',
    element: <KioskRentContainer />
  },
  {
    path: '/kiosk/:id/rent/complete/:holderId',
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
    path: '/kiosk/:id/return/guide',
    element: <KioskReturnGuideContainer />
  },
  {
    path: '/kiosk/:id/return/complete/:holderId',
    element: <KioskReturnCompleteContainer />
  },
  {
    path: '/kiosk/:id/404',
    element: <KioskFixingContainer />
  },
  {
    path: '/kiosk/:id/SpeechButton',
    element: <SpeechButton />
  },
]

export default routes;