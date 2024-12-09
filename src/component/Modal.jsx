import { IoMdClose } from "react-icons/io";
import Field from "./Field";
import axios from "axios";


const Modal = ({ isModelOpen, setIsModelOpen, setContacts, editItem }) => {



   const handleSumbit = (e) => {
      e.preventDefault();

      const Formdata = new FormData(e.target);

      const newContact = Object.fromEntries(Formdata.entries());

      // kişi ekleme
      if (!editItem) {
         axios.post(`contact`, newContact);
         setContacts((contacts) => [...contacts, newContact]);
      }
      //kişi düzenleme
      else {
         axios.put(`/contact/${editItem.id}`, newContact).then(() => {
            setContacts((contacts) => contacts.map((contacts) => contacts.id === editItem.id ? newContact : contacts))

         });


      };



      setIsModelOpen(() => false);


   };


   return (

      isModelOpen && (<div className="modal">
         <div className="modal-inner">
            {/* head kısmı */}
            <div className="modal-head">
               <h2> {editItem ? "kişiyi güncelle" : "Yeni kişi Ekle"} </h2>
               <button >
                  <IoMdClose />
               </button>

            </div>
            {/* form */}
            <form onSubmit={handleSumbit}>
               <Field value={editItem?.name} label="İsim Soyisim" name="name" />
               <Field value={editItem?.positon} label="pozisyon" name="positon" />
               <Field value={editItem?.company} label="Şirket" name="company" />
               <Field value={editItem?.phone} label="Telefon" name="phone" />
               <Field value={editItem?.email} label="E-mail" name="email" />
               <div className="buttons">
                  <button
                     onClick={() => { setIsModelOpen(false) }}
                  >Vazgeç</button>
                  <button


                  >Gönder</button>
               </div>
            </form>

         </div>
      </div>)

   );
}

export default Modal;


