import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './common/Header/Header'
import { Body } from './pages/Body/Body'
import { Footer } from './common/Footer/Footer'
import fondo from '../../img/fondo.jpg';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ backgroundImage: `url(${fondo})` }}>
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

export default App
