import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contextAPI/index";
import { ProjectProvider } from "./contextAPI/projectcontext";


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
import SignIn from "./auth/signIN";
import Otp from "./auth/otp";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Dashboard/profile";
import Manageplan from "./Dashboard/Manageplan";
import Back from "./planning/Back"
import Board from "./Board/baord"
import Calender from "./Calender/Calender"
import Code from "./Code/Code"

const App = () => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          <Routes>
            <Route path="/taskhive" element={
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
            <Route path="/taskhive/signin" element={<SignIn />} />
            <Route path="/taskhive/signup" element={<SignUp />} />
            <Route path="/taskhive/otp" element={<Otp />} />
            <Route path="/taskhive/dashboard/project" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manage-plan" element={<Manageplan />} />
            <Route path="/project/:id/backlog" element={<Back/>} />
            <Route path="/project/:id/board" element={<Board/>}/>
            <Route path="/project/:id/calendar" element={<Calender/>}/>
            <Route path="/project/:id/code" element={<Code/>}/>
          </Routes>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
};

export default App;
