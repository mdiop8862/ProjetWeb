import React, { Fragment } from "react";
import { Route , Routes} from "react-router-dom";
import HomePage from "./HomePage";
import ProduitAdd from "./ProduitAdd"
const MyRoutes = ()=>{
    return(
        <Fragment>
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route exact  path="/add" element={<ProduitAdd/>}/>
                <Route exact path="/add/:id" element={<ProduitAdd/>} />
                
            </Routes>
        </Fragment>
    )
}
export default MyRoutes