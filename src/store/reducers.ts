import { combineReducers } from "redux";
import { obstaclesReducer } from "./Obstacles";
import { State } from "./state";

const createRootReducer = () =>
  combineReducers<State>({
    obstacles: obstaclesReducer,
  });

export default createRootReducer;
