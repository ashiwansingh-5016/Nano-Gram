import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import Login from './Component/Login/Login';
import Feed from './Component/Feed/Feed';
import Profile from './Component/Profile/Profile';
import Sidebar from './Component/Sidebar/Sidebar';

function App() {
  const { currentUser } = useAppContext();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {currentUser && <Sidebar />}
      
      <main className="main-content" style={{ flexGrow: 1, marginLeft: currentUser ? '244px' : '0', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/home" />} />
          <Route path="/home" element={currentUser ? <Feed /> : <Navigate to="/login" />} />
          <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={currentUser ? '/home' : '/login'} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
