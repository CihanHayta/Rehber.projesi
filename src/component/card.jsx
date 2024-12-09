import { MdOutlineDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdContactMail } from "react-icons/md";

const Card = ({ contact, handleDelete, handleEdit }) => {

    const [name, surname] = contact.name.split("");



    return (
        <div className="card">
            {/* buttons */}
            <div className="buttons">
                <button onClick={() => { handleEdit(contact) }}><GrUpdate /></button>

                <button onClick={() => { handleDelete(contact.id) }}
                ><MdOutlineDeleteForever /></button>

            </div>
            {/* profi adı */}
            <h1> {name}.{surname} </h1>
            {/* kişi adı */}
            <p> {contact.name} </p>
            {/* posizyon adı */}
            <h3> {contact.positon} </h3>
            {/* şirket adı */}
            <p> {contact.company} </p>

            {/* bottom kısmı */}
            <div className="bottom">
                <div>
                    <span><FaPhoneFlip />
                    </span>
                    <span> {contact.phone} </span>
                </div>
                <div>
                    <span><MdContactMail />
                    </span>
                    <span> {contact.email} </span>
                </div>
            </div>

        </div>
    );
};

export default Card;