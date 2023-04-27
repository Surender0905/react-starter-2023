import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = [
  { id: "0", name: "Roshan" },
  { id: "1", name: "Rakesh" },
  { id: "2", name: "Ravi" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const SelectAllUsers = (state) => state.users;

export default usersSlice.reducer;
