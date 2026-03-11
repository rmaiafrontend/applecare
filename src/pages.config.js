/**
 * pages.config.js - Page routing configuration
 *
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 *
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 *
 * Example file structure:
 *
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 *
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import { lazy } from 'react';
import LandingPage from './pages/LandingPage';
import __Layout from './Layout.jsx';

const Cart = lazy(() => import('./pages/Cart'));
const Compare = lazy(() => import('./pages/Compare'));
const Categories = lazy(() => import('./pages/Categories'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Home = lazy(() => import('./pages/Home'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const Orders = lazy(() => import('./pages/Orders'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Products = lazy(() => import('./pages/Products'));
const Profile = lazy(() => import('./pages/Profile'));
const Search = lazy(() => import('./pages/Search'));
const Splash = lazy(() => import('./pages/Splash'));
const Admin = lazy(() => import('./pages/Admin'));


export const PAGES = {
    "Admin": Admin,
    "LandingPage": LandingPage,
    "Cart": Cart,
    "Categories": Categories,
    "Compare": Compare,
    "Checkout": Checkout,
    "Home": Home,
    "OrderConfirmation": OrderConfirmation,
    "OrderDetail": OrderDetail,
    "Orders": Orders,
    "ProductDetail": ProductDetail,
    "Products": Products,
    "Profile": Profile,
    "Search": Search,
    "Splash": Splash,
}

export const pagesConfig = {
    mainPage: "LandingPage",
    Pages: PAGES,
    Layout: __Layout,
};
