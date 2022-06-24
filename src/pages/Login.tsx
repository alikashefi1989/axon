import { Fragment, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../config/routes.config";
import { APP_ROUTE } from "../enums/appRoute.enum";
import { REDUX_ACTION } from "../enums/reduxAction.enum";
import { ReduxStoreModel } from "../models/reduxStore.model";
import { UserEntityModel } from "../models/user.model";
import { LoginService } from "../service/login.service"

const service = new LoginService();

interface Action {
    type: 'userName' | 'password';
    payload: string
}

const initialForm: Pick<UserEntityModel, 'userName' | 'password'> = {
    userName: '',
    password: '',
}

const Login = (): JSX.Element => {
    const [form, setForm] = useReducer<
        (preState: Pick<UserEntityModel, 'userName' | 'password'>, action: Action) => Pick<UserEntityModel, 'userName' | 'password'>,
        Pick<UserEntityModel, 'userName' | 'password'>>(formReducer, initialForm, formInitilizer);
    const [hasError, setHasError] = useState<boolean>(false)
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user: UserEntityModel | null = useSelector<ReduxStoreModel, ReduxStoreModel['user']>((store: ReduxStoreModel) => store.user);

    useEffect(() => {
        if (user !== null && location.pathname === APP_ROUTE.LOGIN) {
            navigate(routes.contactList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const login = async (data: string) => {
        setHasError(false);
        try {
            let res = await service.login(data);
            if (res.status === 200 && res.data.length > 0) {
                dispatch({ type: REDUX_ACTION.SET_USER, payload: res.data[0] });
                setTimeout(() => {
                    navigate(routes.contactList)
                }, 1000)
            } else {
                setHasError(true);
            }
        } catch (error) {
            setHasError(true);
        }
    }

    return <div className="login-page">
        {
            Object.keys(form).map((item: string) => {
                return <Fragment key={item}>
                    <label className="label">{item.toLowerCase()} :</label>
                    <input
                        type={item === "password" ? "password" : "text"}
                        value={form[item as 'userName' | 'password']}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setForm({ type: item as 'userName' | 'password', payload: event.target.value });
                            if (hasError) {
                                setHasError(false)
                            }
                        }}
                    />
                </Fragment>
            })
        }
        <button
            className={validator(form) ? 'btn' : 'btn disabled'}
            disabled={!validator(form)}
            onClick={() => { login(payloadGenerator(form)) }}
        >
            Login
        </button>
        {
            hasError
                ? <div className="error text-danger">Invalid username or password</div>
                : false
        }
    </div>
}

export default Login

function formReducer(preState: Pick<UserEntityModel, 'userName' | 'password'>, action: Action): Pick<UserEntityModel, 'userName' | 'password'> {
    switch (action.type) {
        case 'userName':
            return { ...preState, userName: action.payload };
        case 'password':
            return { ...preState, password: action.payload };
        default:
            return initialForm;
    }
}

function formInitilizer(): Pick<UserEntityModel, 'userName' | 'password'> {
    return initialForm;
}

function validator(form: Pick<UserEntityModel, 'userName' | 'password'>): boolean {
    if (form.password === '' || form.userName === '') return false;
    return true;
}

function payloadGenerator(form: Pick<UserEntityModel, 'userName' | 'password'>): string {
    return `userName=${form.userName}&password=${form.password}`;
}