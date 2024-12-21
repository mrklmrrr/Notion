import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../redux/notes/actions";
import { selectUser } from "../redux/user/selectors";

function NewNote() {
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  const user = useSelector(selectUser);

  const [titleError, setTitleError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCreateNote = () => {
    if (!title.trim()) {
      setTitleError("Note title cannot be empty");
      return;
    }

    dispatch(createNote(user.id, title, noteText)).then(() => {
      navigate("/notes");
    });
  };

  return (
    <div>
      <div className="flex justify-between gap-5 items-center mt-10 mb-10">
        <Button to="/notes" text="Back" />
        <p className="text-4xl md:text-2xl font-bold mt-5 mb-5">
          Create new note
        </p>
      </div>
      <Input
        type="text"
        placeholder="Note name"
        onDataChange={(value) => {
          setTitle(value);
          setTitleError("");
        }}
        required={true}
      />
      {titleError && (
        <div className="text-red-500 text-center">{titleError}</div>
      )}
      <TextArea onDataChange={setNoteText} placeholder="Note text... " />
      <Button text="Create" handleOnClick={handleCreateNote} />
    </div>
  );
}

export default NewNote;
