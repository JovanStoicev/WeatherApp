import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./components/homePage/Home"
import Details from './components/detailsPage/Details';
import PageNotFound from './components/PageNotFound';


export const App = () => (
<BrowserRouter className="ConcertOne-Regular" basename="/" >
    <Header />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:city" element={<Details />} />
        <Route path='/*' element={<PageNotFound />} />
    </Routes>
    <Footer />
</BrowserRouter>
)