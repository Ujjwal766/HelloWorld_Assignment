// import logo from './logo.svg';
import { useEffect, useState ,useCallback} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [isLoading,setisLoading]=useState(false);
  const [data, setData] = useState([]);
  let limit=10;
  // let url='https://dummyjson.com/products?skip=5&limit=5';
  const fetchDataHandler = useCallback(async () => {

    setisLoading(true);
    try {

      const response = await axios.get(`https://dummyjson.com/products?skip=0&limit=10`);

      const Data = response.data;

      const transformedProducts = Data.products.map((productData) => {
        return {
          id: productData.id,
          title: productData.title,
          description: productData.description,
          image: productData.images[0],
          price:productData.price,
          brand:productData.brand
        };
      });
     
      setData(transformedProducts);
      
    } catch (error) {
      console.log("Error Occurred");
    }
   setisLoading(false);
  }, []);

  const fetchScrollHandler = useCallback(async () => {
    setisLoading(true);
    
    try {
      const response = await axios.get(`https://dummyjson.com/products?skip=${limit}&limit=5`);

      const Data = response.data;

      const transformedMovies = Data.products.map((productData) => {
        return {
          id: productData.id,
          title: productData.title,
          openingText: productData.description,
          releaseDate: productData.images[0],
          price:productData.price,
          brand:productData.brand
        };
      });
      limit+=5;
      
      setData(oldData=>[...oldData,...transformedMovies]);
      
    } catch (error) {
      console.log("Error Occurred");
    }
   setisLoading(false);
   
  }, []);

  
  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

const [reachedBottom, setReachedBottom] = useState(false);

useEffect(() => {

    const handleScroll = () => {
      const offsetHeight = document.documentElement.offsetHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
      const hasReachedBottom = offsetHeight - (innerHeight + scrollTop) <= 10;
      setReachedBottom(hasReachedBottom);
          
    };
    window.addEventListener("scroll", handleScroll); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(()=>{
    if(reachedBottom)
    {
      console.log('bottom');
      fetchScrollHandler();
    }
  },[reachedBottom,fetchScrollHandler]);

  console.log(data);
 let content;
 if(isLoading)
 {
  content=<p>Loading...</p>;
 }

  return (
    <div className="App">
    <h4>Product Data</h4>
      <section>{content}</section>
      <div className='data'>{console.log(data,'render')}
      {data.map((product) => (
        <div key={product.id} className='product'>
        <img src={product.releaseDate} alt='images'/>
        <p>{product.title}</p>
        <p>BrandName : {product.brand}</p>
        <p className='text'>{product.openingText}</p>
          <p>Price : ₹{product.price}</p>   
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;