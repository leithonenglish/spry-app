import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import State from "../models/state";

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    taxThreshold: 1500096,
    over65TaxReliefAmount: 80000,
    retiredTaxReliefAmount: 80000,
    incomeTaxSettings: {
      baseIncomeTaxBracket: 6000000,
      basePercentage: 0.25,
      overBracketPercentage: 0.3,
    },
    nisSettings: {
      percentage: 0.03,
      monthlyCap: 7500,
    },
    educationTaxPercentage: 0.0225,
    nhtPercentage: 0.2,
  },
});
