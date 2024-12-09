
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './component/card';

// icons import
import { CiSearch } from "react-icons/ci";
import { RiMenuLine } from "react-icons/ri";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoPersonAddOutline } from "react-icons/io5";
import Modal from './component/Modal';


/// axios Base Url

axios.defaults.baseURL = "http://localhost:3000";



function App() {

const [contacts,setContacts]= useState([]);

 const [isModelOpen,setIsModelOpen]=useState(false);

 const [editItem,setEditItem]=useState(null);

 useEffect(() => {
  axios.get("/contact").then((res) => setContacts(res.data));
}, []);





const handleSubmit=(e)=>{
  e.preventDefault();
  
  const text =e.target[1].value;
  
  const params={
    q:text,
  };

  axios.get("/contact",{params}).then((res)=>setContacts(res.data));
  
};


const handleDelete =(id)=>{

   const res= confirm("Silmek isteğidinzden eminmisiniz?")

   if(res){
   
    axios.delete(`/contact/${id}`).then(()=>{
     const updated= contacts.filter((contact)=> contact.id !==id);
     setContacts(updated);
    });

    
   }
   else{
    console.log("iptal edildi");
    
   }

}

// güncelleme fonsiyon

const handleEdit=(contact)=>{

  setIsModelOpen(true);

  setEditItem(contact);

console.log(contact);


}



  return (

    <div className='app'>
    
      <header>
        <h1>Rehber</h1>
        {/* form */}
        <div>

          <form onSubmit={handleSubmit}> 

            <button>
              <CiSearch />
            </button>
            <input type="text" placeholder='kişi aratınız' />

          </form>

          <button className='ns'>
            <RiMenuLine />
          </button>

          <button className='ns'>
            <HiMiniSquares2X2 />
          </button>

          <button onClick={()=>{setIsModelOpen(true)}} className='add'>
            <span><IoPersonAddOutline />
            </span>
            <span>Yeni Kişi</span>
          </button>
        </div>

      </header>

      {/* Main kısmı */}

      <main>
       

      {contacts.map((contact)=> <Card key={contact.id} contact={contact}  handleDelete= {handleDelete} handleEdit={handleEdit} />)}

      </main>

    

      <Modal isModelOpen={isModelOpen} setIsModelOpen= {setIsModelOpen} 
      setContacts={setContacts} editItem={editItem}
      />

    </div>

  )
}

export default App
