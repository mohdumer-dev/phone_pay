import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, NavLink, Outlet } from 'react-router-dom'
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
        <Route path='verify-email' element={<VerifyPage />} />

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

function Page() {
  return <div>
    <Outlet />
  </div>
}

export default App