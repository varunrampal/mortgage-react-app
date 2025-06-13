import { useState } from 'react'
import HomeScreen from './components/HomeScreen.jsx'
import AboutUs from './components/AboutUs.jsx'
import Services from './components/Services.jsx'
import Footer from './components/Footer.jsx'
import Contact from './components/Contact.jsx'
import ChatwootWidget from './components/Chatwoot.jsx';
import Whatsapp from './components/Whatsapp.jsx';
import MortgageCalculator from './components/MortgageCalculator.jsx'  
import MortgageCalculatorNew from './components/MortgageCalculatorNew.jsx'
import SendSms from './components/SendSms.jsx'

// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
   <><HomeScreen /><AboutUs /><Services/><MortgageCalculatorNew/><Contact/><Footer/><Whatsapp/></>
   
  )
}

export default App
