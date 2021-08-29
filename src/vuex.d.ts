import { Store } from "vuex";
import State from "./models/state";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
