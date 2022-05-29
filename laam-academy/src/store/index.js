import { createStore, applyMiddleware, compose } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

// middlewares
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";

// Import custom components
import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // whitelist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware)
);
export const persistor = persistStore(store);
