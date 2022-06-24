import { Fragment, useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContactLayout from "../components/ContactLayout";
import { routes } from "../config/routes.config";
import { REDUX_ACTION } from "../enums/reduxAction.enum";
import { ReduxStoreModel } from "../models/reduxStore.model";
import { UserEntityModel } from "../models/user.model";
import { UserService } from "../service/user.service";

const service = new UserService();

interface Action {
    type: 'name' | 'lastName' | 'password';
    payload: string
}

const initialForm: Pick<UserEntityModel, 'name' | 'lastName' | 'password'> = {
    name: '',
    lastName: '',
    password: '',
}

const Profile = (): JSX.Element => {
    const [userInfo, setUserInfo] = useState<UserEntityModel | null>(null);
    const user: UserEntityModel | null = useSelector<ReduxStoreModel, ReduxStoreModel['user']>((store: ReduxStoreModel) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useReducer<
        (preState: Pick<UserEntityModel, 'name' | 'lastName' | 'password'>, action: Action) => Pick<UserEntityModel, 'name' | 'lastName' | 'password'>,
        Pick<UserEntityModel, 'name' | 'lastName' | 'password'>>(formReducer, initialForm, formInitilizer);

    useEffect(() => {
        if (user !== null) {
            setUserInfo(user)
            setForm({ type: 'name', payload: user.name });
            setForm({ type: 'lastName', payload: user.lastName });
            setForm({ type: 'password', payload: user.password });
        }
    }, [user])

    const editProfile = async () => {
        if (userInfo === null || user === null) return;
        try {
            let res = await service.getEditProfile({ ...userInfo, ...form }, user.id);
            if (res.status === 200) {
                dispatch({ type: REDUX_ACTION.SET_USER, payload: res.data })
                setTimeout(() => {
                    navigate(routes.contactList);
                }, 1000)
            }
        } catch (error) {

        }
    }

    return <ContactLayout
        renderProps={() => {
            return <div className="profile-page">
                <div className="avatar-wrapper">
                    {
                        userInfo === null || userInfo.avatar === ''
                            ? <div className="no-img"></div>
                            : <img
                                src={userInfo.avatar}
                                alt={userInfo.name}
                            />
                    }
                </div>
                <div className="form-wrapper pt-3">
                    {
                        Object.keys(form).map((item: string) => {
                            return <Fragment key={item}>
                                <input
                                    type="text"
                                    value={form[item as 'name' | 'lastName' | 'password']}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setForm({ type: item as 'name' | 'lastName' | 'password', payload: event.target.value });
                                    }}
                                />
                            </Fragment>
                        })
                    }
                </div>
            </div>
        }}
        editBtn={() => {
            return <span
                className={validator(form) ? 'text-info cursor-pointer' : 'text-black'}
                onClick={() => { editProfile() }}>
                Edit
            </span>
        }}
    />
}

export default Profile

function formReducer(preState: Pick<UserEntityModel, 'name' | 'lastName' | 'password'>, action: Action): Pick<UserEntityModel, 'name' | 'lastName' | 'password'> {
    switch (action.type) {
        case 'name':
            return { ...preState, name: action.payload };
        case 'lastName':
            return { ...preState, lastName: action.payload };
        case 'password':
            return { ...preState, password: action.payload };
        default:
            return initialForm;
    }
}

function formInitilizer(): Pick<UserEntityModel, 'name' | 'lastName' | 'password'> {
    return initialForm;
}

function validator(form: Pick<UserEntityModel, 'name' | 'lastName' | 'password'>): boolean {
    if (form.password === '' || form.name === '' || form.lastName === '') return false;
    return true;
}