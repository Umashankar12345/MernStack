import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Home from './Home.jsx'
// import Block1 from './Block1.jsx'
// import Block2 from './Block2.jsx'
// import Block3 from './Block3.jsx'
// import Block4 from './Block4.jsx'
// import counter from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <App/>
{/*     
    <Block1/>
  //  <Block2/>
  //  <Block3/>
  //   <Block4/> */}
 
  </StrictMode>
)
