import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import FetchApi from './FetchApi.jsx'
import FetchMovie from './FetchMovie.jsx'
// import Home from './Home.jsx'
// import Block1 from './Block1.jsx'
// import Block2 from './Block2.jsx'
// import Block3 from './Block3.jsx'
// import Block4 from './Block4.jsx'
// import counter from './App.jsx'

// import Numbermagic from './numbermagic.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/* <Numbermagic/> */}
    {/* <App/> */}
  
  {/* <Block1/> */}
  {/* //  <Block2/> */}
  {/* //  <Block3/> */}
  {/* //   <Block4/> */} 
  {/* <FetchApi/> */}
  <FetchMovie/>
 
  </StrictMode>
)
