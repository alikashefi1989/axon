import { REDUX_ACTION } from "../../enums/reduxAction.enum";
import { ReduxStoreModel } from "../../models/reduxStore.model";
import { UserActions } from "./actionModel";

export function reducer(prevState: ReduxStoreModel['user'], action: UserActions): ReduxStoreModel['user'] {

    switch (action.type) {
        case REDUX_ACTION.SET_USER:
            return action.payload;
        case REDUX_ACTION.EMPTY_USER:
            return action.payload;
        default:
            return prevState ? prevState : null
    }
}