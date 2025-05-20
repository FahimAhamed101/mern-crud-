import React from "react";
import { Route, Routes } from "react-router";
import App from "./App";
import ManageProducts from "./ManageProducts";
 import AddProduct from "./AddProduct";
const RoutePage = () => {
  return (
    <div>
      <Routes>
        {/* Main App Routes */}
        <Route path="/"  element={<ManageProducts />}></Route>
       <Route
            path="/add"
            element={
        
                <AddProduct/>
          
            }
          />

    
      </Routes>
    </div>
  );
};
export default RoutePage;        