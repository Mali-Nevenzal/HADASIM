import './App.css'
import Members from './Components/Members/Members'
import MembersDetails from './Components/Members/MemberDetails'
import { React, createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useParams, renderMatches } from 'react-router-dom'
export const userContext = createContext()
export const cacheContext = createContext()

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/'>
              <Route index element={<Members />} />
              <Route path='members/:memberId' element={<MembersDetails />} />
          </Route>
        </Routes>
    </Router>
    </>
  )
}

export default App;
