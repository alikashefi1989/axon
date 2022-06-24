import { Fragment, useEffect, useRef, useState } from "react";
import { BsRecordCircle } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";
import { FiSend } from "react-icons//fi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatLayout from "../components/ChatLayout";
import { MessageEntityModel } from "../models/message.model";
import { ReduxStoreModel } from "../models/reduxStore.model";
import { UserEntityModel } from "../models/user.model";
import { MessageService } from "../service/message.service";
import { UserService } from "../service/user.service";
import idGenerator from "../tools/idGenerator";
import { getFullDate, getFullTime } from "../tools/dateTime";

const messageService = new MessageService();
const userService = new UserService();

const ChatList = (): JSX.Element => {
    const { id } = useParams();
    const user: UserEntityModel | null = useSelector<ReduxStoreModel, ReduxStoreModel['user']>((store: ReduxStoreModel) => store.user);
    const [contact, setContact] = useState<UserEntityModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Array<MessageEntityModel>>([]);
    const [msg, setMsg] = useState<string>('');
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getMessages(filterGenerator(user ? user.id : '', id ? id : ''));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (id) {
            getContact(id)
        }
    }, [id]);

    const getContact = async (userId: string) => {
        try {
            let res = await userService.getContactById(userId);
            setContact(res.data)
        } catch (error: any) {
            console.log(error.response)
        }
    }

    const getMessages = async (filter?: string) => {
        setLoading(true);
        try {
            let res = await messageService.getMessageList(filter);
            setMessages([...res.data.reverse()]);
            setTimeout(() => {
                divRef.current?.scrollTo({ top: divRef.current.scrollHeight, behavior: 'smooth' })
            }, 500)
        } catch (error: any) {
            console.log(error.response)
        } finally {
            setLoading(false);
        }
    }

    const sendMessage = async (msg: string) => {
        let message: MessageEntityModel = {
            id: idGenerator(),
            pairId: `${user?.id}-${contact?.id}`,
            datetime: new Date().getTime(),
            body: msg,
            from: user?.id || '',
            to: contact?.id || '',
            isModified: false,
        }
        try {
            let res = await messageService.sendMessage(message);
            if (res.status >= 200 && res.status <= 204) {
                setMsg('');
                setTimeout(() => {
                    getMessages(filterGenerator(user ? user.id : '', id ? id : ''))
                }, 500)
            }
        } catch (error) {

        }
    }

    return <ChatLayout
        user={contact}
        renderProps={() => {
            return <div className="user-chat">
                {
                    loading
                        ? <div className="loading">Loading ...</div>
                        : undefined
                }
                <div
                    ref={divRef}
                    className="user-chat-inner pb-3"
                >
                    {
                        messages.map((item: MessageEntityModel, i: number) => {
                            return <Fragment key={item.id}>
                                {
                                    (i === 0 || new Date(item.datetime).getDate() !== new Date(messages[i - 1].datetime).getDate())
                                        ? <div className="time-divider">
                                            <span className="color-silver font-size-12">{getFullDate(item.datetime)}</span>
                                        </div>
                                        : undefined
                                }
                                <div className={user?.id === item.from ? "user-msg" : "contact-msg"}>
                                    <div className="msg">
                                        {item.body}
                                        <span className="color-silver font-size-12">{getFullTime(item.datetime)}</span>
                                    </div>
                                </div>
                            </Fragment>
                        })
                    }
                </div>
                <div className="chat-footer px-2">
                    <RiAttachment2 className="color-silver font-size-20" />
                    <input
                        type="text"
                        placeholder="Message"
                        value={msg}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setMsg(event.target.value)
                        }}
                    />
                    {
                        msg === ''
                            ? <BsRecordCircle className="color-silver font-size-20" />
                            : <FiSend
                                className="text-info font-size-20 cursor-pointer"
                                onClick={() => { sendMessage(msg) }}
                            />
                    }
                </div>
            </div>
        }}
    />
}

export default ChatList

const filterGenerator = (userId: string, contactId: string): string => {
    const pairId1: string = `${userId}-${contactId}`;
    const pairId2: string = `${contactId}-${userId}`;
    return `_sort=datetime&_order=desc&pairId=${pairId1}&pairId=${pairId2}`
} 