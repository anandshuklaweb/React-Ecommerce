import { useEffect } from "react";
import Product from "../../components/product/Product";
import Slider from "../../components/slider/Slider";
import "./Home.scss";

const Home = () => {

  // Scroll to product section
  const url = window.location.href;
  
  

  useEffect(() => {
    const scrollToProduct = () => {
      if(url.includes("#products")){
        window.scrollTo({
          top: 700,
          behavior: "smooth"
        })
        return
      }
    }

    scrollToProduct()
  }, [url])

  return (
    <div>
      <Slider />
      <Product withFilter = {false} />
    </div>
  );
};

export default Home;
