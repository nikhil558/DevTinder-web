import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import FeedReducer from "./feedSlice";
import ConnectionReducer from "./connectionSlice";
import RequestReducer from "./requestsSlice";
const appStore = configureStore({
  reducer: {
    user: UserReducer,
    feed: FeedReducer,
    connection: ConnectionReducer,
    request: RequestReducer,
  },
});

export default appStore;
