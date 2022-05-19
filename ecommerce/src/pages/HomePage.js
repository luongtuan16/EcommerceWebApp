import { Link } from "react-router-dom"
import Announcement from "../components/Announcement"
import Categories from "../components/Categories"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import Newsletter from "../components/Newsletter"
import Products from "../components/Products"
import Slider from "../components/Slider"


function HomePage() {
    return (
        <div>
            <NavBar/>
            <Announcement/>
            <Slider/>
            <Categories/>
            <Products/>
            <Link to="/product-list">
                <div style={{
                    textAlign: 'right',
                    margin: "15px 30px",
                    fontWeight: "bold"
                }}>SEE ALL PRODUCTS</div>
            </Link>
            <Newsletter/>
            <Footer/>
        </div>
    ) 

}
export default HomePage