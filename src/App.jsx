import { useState } from 'react'
import HomeScreen from './components/HomeScreen.jsx'
import AboutUs from './components/AboutUs.jsx'
import Services from './components/Services.jsx'
import  Testimonials from './components/Testimonials.jsx'
import Footer from './components/Footer.jsx'
import Contact from './components/Contact.jsx'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
   <><HomeScreen /><AboutUs /><Services/><Contact/><Footer/></>
   
  )
}

export default App
