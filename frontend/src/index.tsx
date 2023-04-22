import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import App from './app/components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faB,
  faL,
  faS,
  faR,
  faUserAstronaut,
  faPersonWalkingLuggage,
  faRocket,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { GlobalError } from './app/pages/GlobalError';
import { AuthLayout } from './app/pages/AuthLayout';
import { ProtectedRoute } from './app/components/ProtectedRoute';
import { GlobalLoader } from './app/components/GlobalLoader';
import Index from './app/pages/Index';

library.add(faB, faL, faS, faR, faUserAstronaut, faPersonWalkingLuggage, faRocket, faEye, faEyeSlash)

const Home = lazy(() => import("./app/pages/Home"))
const About = lazy(() => import('./app/pages/About'))
const NotFound = lazy(() => import('./app/pages/NotFound'))
const Feed = lazy(() => import('./app/components/Feed'))
const LoginForm = lazy(() => import('./app/components/LoginForm'))
const RegisterForm = lazy(() => import('./app/components/RegisterForm'))
const ResetPassword = lazy(() => import('./app/pages/ResetPassword'))
const AuthActions = lazy(() => import('./app/components/AuthActions'))

const container = document.getElementById('root')!;
const root = createRoot(container);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<GlobalError />} >
      <Route index element={<Index />} />
      <Route
        path='home'
        element={
            <Suspense fallback={<GlobalLoader />}>
              <Home />
            </Suspense>}>
        <Route path='feed' element={
          <Suspense>
            <Feed />
          </Suspense>} />
      </Route>
      <Route
        element={<AuthLayout />}>
        <Route path='auth' element={
          <Suspense>
            <AuthActions />
          </Suspense>
        }>
        </Route>
        <Route path='login' element={
          <Suspense>
            <LoginForm />
          </Suspense>} />
        <Route path='register' element={
          <Suspense>
            <RegisterForm />
          </Suspense>
        } />
      </Route>
      <Route path='resetPassword/:token' element={
        <Suspense>
          <ResetPassword />
        </Suspense>
      } />
      <Route path='about' element={
        <Suspense>
          <About />
        </Suspense>} />
      <Route path='*' element={
        <Suspense>
          <NotFound />
        </Suspense>} />
    </Route>
  )
)


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

