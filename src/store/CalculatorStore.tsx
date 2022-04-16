import React, { Dispatch } from 'react'

// State
export type CalcStateKeys =
  | 'cost_purchase'
  | 'cost_addition'
  | 'cost_addition_percent'
  | 'cost_total'
  | 'budget'
  | 'budget_percent'
  | 'maintenance_fees_m'
  | 'maintenance_fees_y'

export type CalcState = {
  main: {
    [key in CalcStateKeys]: {
      val: number
      locked?: boolean
    }
  }
}

const baseCost = 300000
const baseAddition = 0.12
const baseTotal = baseCost + baseCost * baseAddition
const baseBudget = 0.2

export const initialState: CalcState = {
  main: {
    cost_purchase: {
      val: baseCost,
    },
    cost_addition: {
      val: baseCost * baseAddition,
      locked: false,
    },
    cost_addition_percent: {
      val: baseAddition,
      locked: true,
    },
    cost_total: {
      val: baseTotal,
    },
    budget: {
      val: baseTotal * baseBudget,
      locked: false,
    },
    budget_percent: {
      val: baseBudget,
      locked: true,
    },
    maintenance_fees_m: {
      val: 180,
    },
    maintenance_fees_y: {
      val: 180 * 12,
    },
  },
}

// Actions
export enum ACTIONS {
  CALC_UPDATE_VAL = 'CALC_UPDATE_VAL',
  CALC_UPDATE_LOCK = 'CALC_UPDATE_LOCK',
}

// Reducers
type Action =
  | { type: ACTIONS.CALC_UPDATE_VAL; key: CalcStateKeys; val: number }
  | {
      type: ACTIONS.CALC_UPDATE_LOCK
      key: CalcStateKeys
      val: boolean
    }
type Reducer = (state: CalcState, action: Action) => CalcState

export const Reducer: Reducer = (state = initialState, action) => {
  if (action.type === ACTIONS.CALC_UPDATE_VAL) {
    return {
      ...state,
      main: {
        ...state.main,
        [action.key]: {
          ...state.main[action.key],
          val: action.val,
        },
      },
    }
  }

  if (action.type === ACTIONS.CALC_UPDATE_LOCK)
    return {
      ...state,
      main: {
        ...state.main,
        [action.key]: {
          ...state.main[action.key],
          locked: action.val,
        },
      },
    }

  return state
}

// Action Creators
export const calcUpdateVal = (key: CalcStateKeys, val: number) =>
  ({
    type: ACTIONS.CALC_UPDATE_VAL,
    key,
    val: val || 0,
  } as Action)

export const calcUpdateLock = (key: CalcStateKeys, val: boolean) =>
  ({
    type: ACTIONS.CALC_UPDATE_LOCK,
    key,
    val,
  } as Action)

// Store
export type CalcDispatch = Dispatch<Action>
type calcContext = [CalcState, CalcDispatch]
const Store = React.createContext<calcContext>(undefined as any)
export const useCalculatorStore = () => React.useContext(Store)
export const CalculatorStoreProvider: React.FunctionComponent<{
  children: any
}> = ({ children }) => {
  const [globalState, dispatch] = React.useReducer(Reducer, initialState)
  return (
    <Store.Provider value={[globalState, dispatch]}>{children}</Store.Provider>
  )
}
