import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contextAPI/index";

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
import Otp from "./auth/otp"

function App() {
  return (
    <AuthProvider>
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
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<Otp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
