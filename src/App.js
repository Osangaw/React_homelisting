import React from "react";
import store from "./store";
import { Route, Routes } from "react-router";
import Home from "./components/homepage";
import Signup from "./components/signup";
import Login from "./components/signin";
import CreateListing from "./components/createlisting";
import PropertiesPage from "./components/properties";
import PropertyDetails from "./components/propertydetails";
import Layout from "./components/layout";

window.store = store;
function App() {
  return (
    <div>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/property/:id" element={<PropertyDetails/>}/>
      </Routes>
      </Layout>
    </div>
  );
}

export default App;
