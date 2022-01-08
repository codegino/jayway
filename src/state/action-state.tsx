import React, {createContext, useContext, useReducer} from 'react';
import type {FunctionComponent} from 'react';

// Mini state management utility

type ViewType = 'grid' | 'list';

type StateType = {
  view: ViewType;
};

type DispatchType = {type: 'view'; payload: 'grid' | 'list'};

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
    // Default is not needed since there's no way it will be called
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useActionState = () => {
  const {state, dispatch} = useContext(ActionContext) as {
    state: StateType;
    dispatch: React.Dispatch<DispatchType>;
  };

  const {view} = state;

  return {
    view,
    dispatch,
  };
};
