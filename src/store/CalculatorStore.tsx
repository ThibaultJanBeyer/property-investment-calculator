import React, { Dispatch } from 'react'

// State
export type CalcStateKeys =
  | 'cost_purchase'
  | 'cost_addition'
  | 'cost_addition_percent'
  | 'cost_total'
  | 'budget'
  | 'budget_percent'
  | 'yield'
  | 'yield_percent'
  | 'maintenance_repair'
  | 'maintenance_repair_percent'
  | 'maintenance_fees'
  | 'maintenance_fees_year'
  | 'maintenance_fees_fix'
  | 'maintenance_fees_fix_percent'
  | 'loan_total'
  | 'loan_installment'
  | 'loan_installment_year'
  | 'loan_length'
  | 'loan_outstanding'
  | 'loan_cost'
  | 'loan_cost_total'
  | 'tax_rate'
  | 'tax_deduction'
  | 'tax_total'
  | 'tax_total_year'
  | 'rent_pretax'
  | 'rent_pretax_year'
  | 'rent_effective'
  | 'rent_effective_year'

export type CalcState = {
  main: {
    [key in CalcStateKeys]: {
      val: number
      locked?: boolean
    }
  }
}

const baseCost = 300000
const baseAddition = 0.15
const baseTotal = baseCost + baseCost * baseAddition
const baseBudget = 0.2
const baseMaintenance = 180
const baseMaintenanceFixPercent = 0.2
const baseMaintenanceFix = baseMaintenance * 12 * baseMaintenanceFixPercent
const baseYieldPercent = 0.04
const baseYield = baseTotal * baseBudget * baseYieldPercent
const baseRepairPercent = 0.1
const baseRepair = baseYield * baseRepairPercent
const baseLoanTotal = baseTotal - baseTotal * baseBudget
const baseLoanInstallment = 1075.75
const baseLoanLength = 10
const baseLoanOutstanding = 213136.98
const baseLoanCosts =
  baseLoanInstallment * 12 * baseLoanLength +
  baseLoanOutstanding -
  baseLoanTotal
const baseTaxRate = 0.41
export const baseTaxDeductionPercent = 0.02
const baseTaxDeduction = baseTotal * baseTaxDeductionPercent
const baseRentPretax =
  baseYield +
  baseLoanInstallment * 12 +
  baseMaintenanceFix +
  baseRepair +
  baseLoanCosts / baseLoanLength
const baseTaxTotal =
  (baseRentPretax - baseTaxDeduction - baseLoanCosts / baseLoanLength) *
  baseTaxRate

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
    yield: {
      val: baseYield,
      locked: false,
    },
    yield_percent: {
      val: baseYieldPercent,
      locked: true,
    },
    maintenance_repair: {
      val: baseRepair,
      locked: false,
    },
    maintenance_repair_percent: {
      val: baseRepairPercent,
      locked: true,
    },
    maintenance_fees: {
      val: baseMaintenance,
      locked: true,
    },
    maintenance_fees_year: {
      val: baseMaintenance * 12,
      locked: false,
    },
    maintenance_fees_fix: {
      val: baseMaintenanceFix,
      locked: false,
    },
    maintenance_fees_fix_percent: {
      val: baseMaintenanceFixPercent,
      locked: true,
    },
    loan_total: {
      val: baseLoanTotal,
    },
    loan_installment: {
      val: baseLoanInstallment,
      locked: true,
    },
    loan_installment_year: {
      val: baseLoanInstallment * 12,
      locked: false,
    },
    loan_length: {
      val: baseLoanLength,
    },
    loan_outstanding: {
      val: baseLoanOutstanding,
    },
    loan_cost: {
      val: baseLoanCosts / baseLoanLength,
    },
    loan_cost_total: {
      val: baseLoanCosts,
    },
    tax_rate: {
      val: baseTaxRate,
    },
    tax_deduction: {
      val: baseTaxDeduction,
    },
    tax_total: {
      val: baseTaxTotal / 12,
    },
    tax_total_year: {
      val: baseTaxTotal,
    },
    rent_pretax: {
      val: baseRentPretax / 12,
    },
    rent_pretax_year: {
      val: baseRentPretax,
    },
    rent_effective: {
      val: (baseRentPretax + baseTaxTotal) / 12,
    },
    rent_effective_year: {
      val: baseRentPretax + baseTaxTotal,
    },
  },
}

// Actions
export enum ACTIONS {
  CALC_UPDATE_VAL = 'CALC_UPDATE_VAL',
  CALC_UPDATE_LOCK = 'CALC_UPDATE_LOCK',
  CALC_SET_STATE = 'CALC_SET_STATE',
  CALC_NULL_LOAN = 'CALC_NULL_LOAN',
}

// Reducers
type Action =
  | { type: ACTIONS.CALC_UPDATE_VAL; key: CalcStateKeys; val: number }
  | {
      type: ACTIONS.CALC_UPDATE_LOCK
      key: CalcStateKeys
      val: boolean
    }
  | { type: ACTIONS.CALC_SET_STATE; val: CalcState }
  | { type: ACTIONS.CALC_NULL_LOAN }
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

  if (action.type === ACTIONS.CALC_SET_STATE) return action.val

  if (action.type === ACTIONS.CALC_NULL_LOAN) {
    const nullStateFields: CalcStateKeys[] = [
      'loan_installment',
      'loan_outstanding',
    ]
    return {
      ...state,
      main: {
        ...state.main,
        loan_length: {
          ...state.main.loan_length,
          val: 1,
        },
        ...nullStateFields.reduce(
          (prev, value) => ({
            ...prev,
            [value]: {
              ...state.main[value],
              val: 0,
            },
          }),
          {}
        ),
      },
    }
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

export const calcSetState = (val: CalcState) =>
  ({
    type: ACTIONS.CALC_SET_STATE,
    val,
  } as Action)

export const calcNullLoan = () => ({ type: ACTIONS.CALC_NULL_LOAN } as Action)

// Store
export type CalcDispatch = Dispatch<Action>
type calcContext = [CalcState, CalcDispatch]
const Store = React.createContext<calcContext>(undefined as any)
export const useCalculatorStore = () => React.useContext(Store)
export const CalculatorStoreProvider: React.FunctionComponent<{
  children: any
}> = ({ children }) => {
  const [globalState, dispatch] = React.useReducer(Reducer, initialState)
  // store state in query params … console.log('REDUCER', globalState)?
  return (
    <Store.Provider value={[globalState, dispatch]}>{children}</Store.Provider>
  )
}
