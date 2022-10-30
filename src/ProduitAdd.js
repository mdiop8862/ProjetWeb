
import { useEffect, useRef, useState } from "react";
import "./produitAdd.css" ;
import { db , storage } from "./firebase";
import {ref , uploadBytes , getDownloadURL} from "firebase/storage"
import { addDoc, collection, getDoc  , doc, setDoc} from "firebase/firestore";
import addFile from "./images/addFile.svg" ; 
import AddImage from "./images/AddImage.svg" ; 
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProduitAdd =()=>{
 
  const navigate = useNavigate(null)
 const Data = {nomProduit : "" , quantiteProduit : "" , prixProduit : "" , descriptionProduit : ""}
  
 const [myvalues , setvalue] = useState({...Data})

 const {nomProduit , quantiteProduit , prixProduit , descriptionProduit} = myvalues; 
 
 const [image , setimage] = useState(null)

 const params = useParams()

      const handlechange = (e)=>{

        setvalue({
          ...myvalues , 
          [e.target.id] : e.target.value 

        })
      }

  
      const handleSubmit =async (e) => {
       e.preventDefault()
       
        if(params.id){

            const imageref = ref(storage , `avatars/${image.name}`)
             uploadBytes(imageref, image)
            .then((snapshot) => { 
              getDownloadURL(imageref)
            .then((url)=>{
                     console.log(url)
                     setDoc(doc(db , "Product" , params.id) , {
                      Name : nomProduit , 
                      Description : descriptionProduit , 
                      Quantite : quantiteProduit , 
                      prix : prixProduit , 
                      avatar : url
                    })

                       setvalue({...Data})
                       setimage(null)
                       toast.success('🦄 updating success !', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                     
                         })
           .catch((e)=>{
                   console.log(e)
                       })

                        });
            
            
           
        }

        else{
          const imageref = ref(storage , `avatars/${image.name}`)
          // on telecharge l'image 
          uploadBytes(imageref, image)
         .then((snapshot) => {
                          getDownloadURL(imageref)
                        .then((url)=>{
                                 console.log(url)
                                   addDoc(collection(db , "Product") , {
                                    Description : descriptionProduit ,
                                         Name : nomProduit , 
                                         Quantite : quantiteProduit , 
                                         avatar : url ,
                                         prix : prixProduit
                                   })
    
                                   setvalue({...Data})
                                   setimage(null)

                                   toast.success('🦄 adding success !', {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                    });
                                 
                                     })
                       .catch((e)=>{
                               console.log(e)
                                   })
          
          });
        }
      
      


          
}


useEffect(()=>{
     if(params.id)
     {
      console.log(params.id)
      getDoc(doc(db , "Product" , params.id))
      .then((thedoc)=>{
             console.log(thedoc.data())
             setvalue({
              nomProduit : thedoc.data().Name , 
              descriptionProduit : thedoc.data().Description ,
              quantiteProduit : thedoc.data().Quantite , 
              prixProduit : thedoc.data().prix
             })

            
      })
      .catch((e)=>{
        console.log(e)
      })
     }
    
      
},[])



  return (

    <div className="HomePage">
                      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>

                  <nav className="navbar navbar-expand-lg fixed-top ">

                            <div className="container">
                            <ul className="navbar-nav ">
                                  <li className="nav-item"><NavLink to={"/"} className={"nav-link"}>Home</NavLink></li>
                                  <li className="nav-item"><NavLink to={"/add"} className={"nav-link"}>Add Product</NavLink></li>
                                  <li className="nav-item"><NavLink className={"nav-link mylogout text-danger"}>Log Out</NavLink></li>
        
                            </ul>
                             </div>

                   </nav>

            
         <div className="produitAdd  row  text-center justify-content-around">

      <div className="col-auto   text-center left">

   <form onSubmit={handleSubmit}>


     <h3 className="mt-3 ">Ajouter un produit</h3>
     <div className="ml-5">


     <div className="input_file">


       <label >
           <img src={addFile} alt="" className="" id="imageShare"  />
           <input type="file" id="idImgChange"  onChange={(e)=>setimage(e.target.files[0])} />
       </label>


       </div> 

     </div>

    <input className="" type="text" placeholder="Nom du produit" id="nomProduit" value={nomProduit} onChange={handlechange} /><br/>
    <input type="number" placeholder="Quantité" id="quantiteProduit"  value={quantiteProduit} onChange={handlechange}/>
    <input type="number" placeholder="Prix" id="prixProduit"  value={prixProduit} onChange={handlechange}/><br/>
    <textarea placeholder="Ajouter une description à ce produit" id="descriptionProduit" value={descriptionProduit} onChange={handlechange}/><br/>
    <div className="row justify-content-center ">
      
    <input type="submit" value="Submit" id="valider" className=" btn text-white m-1"/>
    <input type="submit" value="Back"  id="valider" className=" btn bg-danger text-white m-1" onClick={()=>navigate(-1)}/>

    </div>
   


  </form>
  
  </div>
  
<div className="col-auto imageRight align-self-end " >
  <img src={AddImage} alt=""/>
</div>
  

  </div>  


    </div>

   

  )
          }

export default ProduitAdd ; 
