import React from "react";
import { Route, Routes } from "react-router";
import App from "./App";
import ManageProducts from "./ManageProducts";
 import AddProduct from "./AddProduct";
 import UpdateProducts from "./UpdateProducts";
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
        <Route
            path="edit/:id"
            element={
              
               <UpdateProducts/>
             
            }
          />
    
      </Routes>
    </div>
  );
};
export default RoutePage;        