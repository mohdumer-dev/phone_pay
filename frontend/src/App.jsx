import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import SignupPage from './pages/Signup'
import SigninPage from './pages/Signin'
import Dashboard from './pages/Dashboard'
import VerifyPage from './pages/Verify'
import Portal from './pages/Portal'
import Error from './pages/Error'
import SendMoneyPage from './pages/SendMoney'
import TransferConfirmationPage from './pages/Successful'

const App = () => {
  const [reciever, setReciever] = useState('')
  console.log(reciever)
  const [amount, setAmount] = useState('')
  const [firstname, setfirstname] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='verify-email' element={<Protected><VerifyPage /></Protected>} />
        <Route path='*' element={<Error />} />

        <Route path='/' element={<Navigate to='/payment' />} />

        <Route path='/' element={<Page />}>
          <Route path='payment' element={<Portal />} />
          <Route path='*' element={<Error />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='gateway' element={
            <SendMoneyPage
              setAmount={setAmount}
              amount={amount}
              firstname={firstname}
              setfirstname={setfirstname}
              setReciever={setReciever} />} />

          <Route path='confirmation' element={
            <TransferConfirmationPage
              amount={amount}
              setAmount={setAmount}
              recipientName={firstname}
              transactionId="TRX123456789" />}
            reciever={reciever} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


function Protected({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!token) {
      return navigate('/signin')
    }
  

  },[navigate])
 

  return  children
}




function Page() {
  return <div>
    <Protected>
      <Outlet />
    </Protected>

  </div>
}

export default App