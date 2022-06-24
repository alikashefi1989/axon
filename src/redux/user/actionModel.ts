import { Action } from 'redux';
import { REDUX_ACTION } from '../../enums/reduxAction.enum';
import { UserEntityModel } from '../../models/user.model';

export interface UserActions extends Action<REDUX_ACTION> {
    payload: UserEntityModel | null;
}