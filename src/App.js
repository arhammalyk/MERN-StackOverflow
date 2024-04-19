import Landingpage from "./components/Landingpage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Adminsignin from "./components/Adminsignin";
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import About from "./components/About";
import Accountrecovery from "./components/Accountrecovery";
import Allquestions from "./components/Allquestions";
import Adminsignup from "./components/Adminsignup";
import Userprofile from "./components/Userprofile";
import Users from "./components/Users";
import Notes from "./components/Notes";
import { useSelector } from "react-redux";
import Alert from "./components/Alert";
import Setting from "./components/Setting";
import AskQuestion from "./components/AskQuestion";
import SpecificQuestion from "./components/SpecificQuestion";
import Products from "./components/Products";
// require("dotenv").config();

function App() {
  const alert = useSelector((state) => state.alert.boolValue);
  const loading = useSelector((state) => state.loading.value);
  return (
    <>
      <Navbar />
      <LoadingBar color="#f11946" progress={loading} height={6} />
      <LoadingBar color="#4c5d6f" progress={99} height={3} />
      {alert && <Alert />}
      <Routes>
        <Route exact path="/" element={<Landingpage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/adminportal" element={<Adminsignin />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/accountrecovery" element={<Accountrecovery />} />
        <Route exact path="/adminsignup" element={<Adminsignup />} />
        <Route exact path="/profile" element={<Userprofile />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/notes" element={<Notes />} />
        <Route exact path="/setting" element={<Setting />} />
        <Route exact path="/questions" element={<Allquestions />} />
        <Route exact path="/questions/ask" element={<AskQuestion />} />
        <Route
          exact
          path="/questions/question"
          element={<SpecificQuestion />}
        />
        <Route exact path="/products" element={<Products />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
