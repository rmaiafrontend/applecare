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
import LandingPage from './pages/LandingPage';
import Cart from './pages/Cart';
import Compare from './pages/Compare';
import Categories from './pages/Categories';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDetail from './pages/OrderDetail';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Splash from './pages/Splash';
import Admin from './pages/Admin';
import __Layout from './Layout.jsx';


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