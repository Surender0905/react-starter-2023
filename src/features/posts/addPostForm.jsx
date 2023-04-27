import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postSlice";
import { SelectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const users = useSelector(SelectAllUsers);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    title: "",
    content: "",
    userId: "",
  });
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const { title, content, userId } = input;

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      setAddRequestStatus("pending");
      dispatch(postAdded(title, content, userId)).unwrap();
    }

    setInput({ title: "", content: "", userId: "" });
    setAddRequestStatus("idle");
  };

  const usersOption = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          placeholder="Title"
          value={input.title}
          onChange={(e) => setInput({ ...input, title: e.target.value })}
        />
        <select
          onChange={(e) => setInput({ ...input, userId: e.target.value })}
        >
          <option value=""></option>
          {usersOption}
        </select>
        <textarea
          placeholder="Content"
          value={input.content}
          onChange={(e) => setInput({ ...input, content: e.target.value })}
        ></textarea>
        <button
          type="submit"
          style={{ backgroundColor: canSave ? "blue" : "red" }}
          disabled={!canSave}
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
