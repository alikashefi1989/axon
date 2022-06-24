import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { routes } from "../config/routes.config";
import { UserEntityModel } from "../models/user.model"

interface ChatLayoutProps {
    user: UserEntityModel | null;
    renderProps: () => JSX.Element
}

const ChatLayout = (props: ChatLayoutProps): JSX.Element => {
    const navigate = useNavigate();
    return <div className="chat-layout">
        <div className="header px-1">
            <span
                className="cursor-pointer text-info"
                onClick={() => navigate(routes.contactList)}
            >
                <BsChevronLeft className="text-info" /> Back
            </span>
            <span className="text-white">{props.user?.name} {props.user?.lastName}</span>
            {
                props.user?.avatar === ''
                    ? <div className="no-img">
                        {`${props.user?.name[0]} ${props.user?.lastName[0]}`}
                    </div>
                    : <img
                        src={props.user?.avatar}
                        alt={props.user?.name}
                    />
            }
        </div>
        <div className="body">
            {props.renderProps()}
        </div>
    </div>
}

export default ChatLayout