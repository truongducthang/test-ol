
import Box from '@mui/material/Box';
import { useAppSelector } from 'app/hooks';
import { AdminLayout } from 'components/Admin';
import { NotFount } from 'components/common/NotFount';
import PrimarySearchAppBar from 'components/common/PrimarySearchAppBar';
import PrivateRoute from 'components/common/PrivateRoute';
import { selectIsLoggedIn, selectIsLogging } from 'features/auth/authSlice';
import LoginPage from 'features/auth/pages/LoginPage';
import HomePage from 'features/home/HomePage';
import MessagesPage from 'features/messages/MessagesPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from 'utils/history';

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLogging = useAppSelector(selectIsLogging);
  const user = useAppSelector((state) => state.auth.currentUser);
  console.log({ isLoggedIn, isLogging, user });
  return (
    <HistoryRouter history={history as any}>
      <div>
       
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
                <HomePage />
            }
          />
          <Route
            path="/messages"
            element={
              <PrivateRoute>
                <MessagesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFount />} />
        </Routes>

        {/* <PrivateRoute path={['/home', '/']} exact element={<HomePage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}

        {/* <Route path="*" element={<NotFount />} /> */}

        {/* <Route path="/">
          <Home />
        </Route> */}
      </div>
    </HistoryRouter>
  );
}

export default App;
