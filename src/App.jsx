
import Navbar from './components/navbar';
import Landing from './components/landingpage';
import About from './components/about';
import Featured from "./components/featured"
import CustomerReviews  from './components/customer';
import Pricing from "./components/pricing"
import Docs from "./components/Docs"
import Trust from "./components/trust"
import FAQ from "./components/FAQ"
import SalesMarketingSection from './components/SalesMarketing';
import Footer from "./components/footer"
function App() {

  return (
    <>
     <div className='w-full h-screen  text-white'>
     <Navbar/>
      <Landing/>
       <Featured/>
       <CustomerReviews/>
       <Pricing/>
       <Docs/>
       <Trust/>
       <FAQ/>
       <SalesMarketingSection/>
       <Footer/>
     </div>
      
    </>
  )
}

export default App
