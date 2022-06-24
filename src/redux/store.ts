import { AnyAction, combineReducers, Reducer, ReducersMapObject } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import { reducer as UserReducer } from './user/reducer';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ReduxStoreModel } from "../models/reduxStore.model";

const reducers: ReducersMapObject<ReduxStoreModel, AnyAction> = {
    user: UserReducer as Reducer<ReduxStoreModel['user'], AnyAction>,
}

const combinedReducers = combineReducers(reducers);

const persistConfig = {
    key: 'root',
    storage
};

const persistedCombinedReducers = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
    reducer: persistedCombinedReducers,
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistedStore = persistStore(store);