import { Action } from '@ngrx/store';

export const SEARCH = 'SEARCH';
export const ADD = 'ADD';
export const ERROR = 'ERROR';

export class Search implements Action {
  readonly type = SEARCH;
  constructor(public payload: string) {}
}

export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: any) {}
}

export class Error implements Action {
  readonly type = ERROR;
}
