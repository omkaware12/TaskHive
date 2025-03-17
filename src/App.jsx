import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Landing from './components/landingpage';
import About from './components/about';
import Featured from "./components/featured";
import CustomerReviews from './components/customer';
import Pricing from "./components/pricing";
import Docs from "./components/Docs";
import Trust from "./components/trust";
import FAQ from "./components/FAQ";
import SalesMarketingSection from './components/SalesMarketing';
import Footer from "./components/footer";
import SignUp from "./auth/signUp"; 
import SignIn from "./auth/signIN"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
          <Navbar />
            <Landing />
            <Featured />
            <CustomerReviews />
            <Pricing />
            <Docs />
            <Trust />
            <FAQ />
            <SalesMarketingSection />
            <Footer />
          </>
        } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
