import React, {createContext, useContext, useReducer} from 'react';
import type {FunctionComponent} from 'react';

// Mini state management utility

type ViewType = 'grid' | 'list';
type SortType = 'asc' | 'desc';

type StateType = {
  view: ViewType;
  sort: SortType;
  filter: string;
};

type DispatchType =
  | {type: 'view'; payload: 'grid' | 'list'}
  | {type: 'sort'; payload: 'asc' | 'desc'}
  | {type: 'filter'; payload: string};

type ActionState = {
  dispatch: React.Dispatch<DispatchType>;
  state: StateType;
};

export const ActionContext = createContext<ActionState>(
  null as unknown as ActionState,
);

export const ActionProvider: FunctionComponent = ({children}) => {
  const [state, dispatch] = useReducer(stateReducer, {
    view: 'grid',
    sort: 'asc',
    filter: '',
  });

  return (
    <ActionContext.Provider value={{dispatch, state}}>
      {children}
    </ActionContext.Provider>
  );
};

export const stateReducer = (
  state: StateType,
  action: DispatchType,
): StateType => {
  switch (action.type) {
    case 'view':
      return {...state, view: action.payload};
    case 'sort':
      return {...state, sort: action.payload};
    case 'filter':
      return {...state, filter: action.payload};
    // Default is not needed since there's no way it will be called
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useActionState = () => {
  const {state, dispatch} = useContext(ActionContext) as {
    state: StateType;
    dispatch: React.Dispatch<DispatchType>;
  };

  const {view, sort, filter} = state;

  return {
    view,
    sort,
    filter,
    dispatch,
  };
};
