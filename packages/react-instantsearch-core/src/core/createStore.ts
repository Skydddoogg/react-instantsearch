type UIState = {
  [index: string]: any; // @TODO: UIState?
};
export type SearchState = { indices?: UIState } | UIState;
export type SearchResults = any; // @TODO: give results type
export type SearchForFacetValuesResults = any;
export type MetaData = any[];
export type State = {
  widgets: SearchState;
  metadata: MetaData;
  results: SearchResults | null;
  resultsFacetValues: SearchForFacetValuesResults | null;
  error: any | null;
  searching: boolean;
  isSearchStalled: boolean;
  searchingForFacetValues: boolean;
};

type Listener = () => any; d
export default function createStore(initialState: State) {
  let state = initialState;
  const listeners: Listener[] = [];
  return {
    getState() {
      return state;
    },
    setState(nextState: State) {
      state = nextState;
      listeners.forEach(listener => listener());
    },
    subscribe(listener: Listener) {
      listeners.push(listener);
      return function unsubscribe() {
        listeners.splice(listeners.indexOf(listener), 1);
      };
    },
  };
}

export type Store = ReturnType<typeof createStore>;
