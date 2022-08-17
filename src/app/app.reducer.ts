import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as tesoreria from './my-gastos/my-gastos.reducer';

export interface AppState {
   ui: ui.State,
   user: auth.State,
   ingEgr: tesoreria.State
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
   ingEgr: tesoreria.myGastosReducer
}