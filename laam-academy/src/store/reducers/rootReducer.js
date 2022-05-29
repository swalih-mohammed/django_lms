import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducer from "./user";
import courseListReducer from "./courseList";
import courseReducer from "./course";
import unitReducer from "./unit";
import lessonReducer from "./lesson";
import quizReducer from "./quiz";
import enrolledCourseListReducer from "./enrolledCourseList";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  courseList: courseListReducer,
  enrolledCourseList: enrolledCourseListReducer,
  course: courseReducer,
  unit: unitReducer,
  lesson: lessonReducer,
  quiz: quizReducer,
});

export default rootReducer;
