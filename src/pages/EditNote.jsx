import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectNoteById, selectNotesLoading } from "../redux/notes/selectors";
import { editNote, getNote } from "../redux/notes/actions";

export default function EditNote() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const note = useSelector(selectNoteById(id));

  const loading = useSelector(selectNotesLoading);

  useEffect(() => {
    dispatch(getNote(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setText(note.text);
    }
  }, [note]);

  const handleEdit = () => {
    if (!title.trim()) {
      setTitleError("Note title cannot be empty");
      return;
    }

    dispatch(editNote(id, title, text)).then(() => {
      navigate("/notes/view/" + id);
    });
  };

  return (
    <div>
      {loading && <div>loading...</div>}
      {!note && !loading && <div>There is no note with this id</div>}

      {note && (
        <>
          <div className=" flex justify-between gap-5 items-center mt-10 mb-10">
            <Button to="/notes" text="Back" />
            <p className="text-4xl font-bold mt-5 mb-5 md:text-2xl">
              Edit note
            </p>
          </div>
          <Input
            type={"text"}
            placeholder={"title"}
            onDataChange={setTitle}
            value={title}
          />
          {titleError && (
            <div className="text-red-500 text-center">{titleError}</div>
          )}
          <TextArea
            onDataChange={setText}
            placeholder={"Enter "}
            value={text}
          />
          <Button text="Save" handleOnClick={handleEdit} />
        </>
      )}
    </div>
  );
}
