import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar';
import AllRoutes from './pages/AllRoutes';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <ScrollToTop/>
      <AllRoutes/>
      <Footer/>
    </div>
  );
}



export default App;
