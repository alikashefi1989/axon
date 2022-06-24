import { BsBoundingBox, BsFillChatFill, BsGearWideConnected, BsPencilSquare, BsPersonFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { routes } from "../config/routes.config";

interface ContactLayoutProps {
    renderProps: () => JSX.Element
    editBtn?: () => JSX.Element
}

const ContactLayout = (props: ContactLayoutProps): JSX.Element => {
    const navigate = useNavigate();

    return <div className="contact-layout">
        <div className="header px-3">
            {
                props.editBtn
                    ? <BsBoundingBox className="text-info" />
                    : <span className="text-info">Edit</span>
            }
            {
                props.editBtn
                    ? undefined
                    : <span className="text-white fw-bold">Chats</span>
            }
            {
                props.editBtn
                    ? props.editBtn()
                    : <BsPencilSquare className="text-info" />
            }
        </div>
        <div className="body">
            {props.renderProps()}
        </div>
        <div className="footer px-3">
            <div
                className="item"
                onClick={() => { navigate(routes.profile) }}
            >
                <div className="user">
                    <BsPersonFill className={props.editBtn ? "text-info" : "text-black"} />
                </div>
                <span>Profile</span>
            </div>
            <div
                className="item"
                onClick={() => { navigate(routes.contactList) }}
            >
                <BsFillChatFill className={props.editBtn ? "text-black" : "text-info"} />
                <span>Chats</span>
            </div>
            <div
                className="item">
                <BsGearWideConnected className="text-black settings" />
                <span>Settings</span>
            </div>
        </div>
    </div>
}

export default ContactLayout