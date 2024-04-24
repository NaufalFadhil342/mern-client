import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainNavigation from './Shared/components/Navigation/mainNavigation';
import { AuthContext } from './Shared/context/auth-context';
import { useAuth } from './Shared/hooks/auth-hook';
import LoadingSpinner from './Shared/components/UIElement/loadingSpinner';

const Users = React.lazy(() => import('./users/pages/users'));
const NewPlace = React.lazy(() => import('./Places/pages/newPlace'));
const UserPlaces = React.lazy(() => import('./Places/pages/userPlaces'));
const UpdatePlace = React.lazy(() => import('./Places/pages/updatePlace'));
const Auth = React.lazy(() => import('./users/pages/auth'));

function App() {
  let routes;
  const { token, login, logout, userId } = useAuth();

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/places/:userId" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/places/:userId" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>
      <Router>
        <MainNavigation />
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
