import { createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItems, unSetItems } from './my-gastos.actions';

export interface State {
    items: IngresoEgreso[]; 
}

export const initialState: State = {
    items: [],
}

const _myGastosReducer = createReducer(initialState,

    on( setItems, (state, { items }) => ( { ...state, items: [...items] } ) ),
    on( unSetItems, state => ( { ...state, items: [] } ) ),

);

export function myGastosReducer(state, action) {
    return _myGastosReducer(state, action);
}