import { Fragment, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContactLayout from "../components/ContactLayout"
import { routes } from "../config/routes.config";
import { ReduxStoreModel } from "../models/reduxStore.model";
import { UserEntityModel } from "../models/user.model";
import { UserService } from "../service/user.service"

const service = new UserService();

const ContactList = (): JSX.Element => {
    const [contacts, setContacts] = useState<Array<UserEntityModel>>([]);
    const [search, setSearch] = useState<string>('');
    const navigator = useNavigate();
    const user: UserEntityModel | null = useSelector<ReduxStoreModel, ReduxStoreModel['user']>((store: ReduxStoreModel) => store.user);

    useEffect(() => { getContacts() }, []);

    const getContacts = async (): Promise<any> => {
        try {
            let res = await service.getContactList();
            setContacts(res.data);
        } catch (error: any) {
            console.log(error.response);
        }
    }

    return <ContactLayout
        renderProps={() => {
            return <div className="contact-list-wrapper">
                <div className="search-outer-wrapper">
                    <div className="search-wrapper">
                        <BsSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search users"
                            value={search}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setSearch(event.target.value || '');
                            }}
                        />
                    </div>
                </div>
                <div className="list">
                    {
                        filterUsers(contacts, search, user === null ? '' : user.id).map((user: UserEntityModel, i: number) => {
                            return <Fragment key={user.id}>
                                <div
                                    className="user-row"
                                    onClick={() => { navigator(routes.chat(user.id)) }}
                                >
                                    <div className="img-wrapper">
                                        {
                                            user.avatar === ''
                                                ? <div className="no-img">{`${user.name[0]} ${user.lastName[0]}`}</div>
                                                : <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                />
                                        }
                                    </div>
                                    <div className="name-last-msg">
                                        <span className="name">{user.name} {user.lastName}</span>
                                        <span className="msg">
                                            hi r u ok?
                                        </span>
                                        <div className="divider"></div>
                                    </div>
                                </div>
                            </Fragment>
                        })
                    }
                </div>
            </div>
        }}
    />
}

export default ContactList

const filterUsers = (list: Array<UserEntityModel>, search: string, userId: string): Array<UserEntityModel> => {
    let filteredList: Array<UserEntityModel> = [];

    for (let i = 0; i < list.length; i++) {
        if (list[i].id !== userId && search === '') {
            filteredList.push(list[i]);
        } else {
            if ((list[i].name.toLowerCase().includes(search) || list[i].lastName.toLowerCase().includes(search)) && list[i].id !== userId) {
                filteredList.push(list[i]);
            }
        }
    }

    return filteredList;
}