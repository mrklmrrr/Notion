import { Suspense, useEffect } from "react";
import { CiTrash, CiEdit } from "react-icons/ci";
import { Await, NavLink, useLoaderData, useNavigate } from "react-router-dom";
import API from "../utils/API";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";

import { deleteNote, getAuthorNotes } from "../redux/notes/actions";

export default function Notes() {
  const user = useSelector(selectUser);

  const { loading, data } = useSelector((store) => store.notes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorNotes(user.id));
  }, [dispatch, user.id]);

  return (
    <div>
      <p className="text-4xl font-bold mb-5 text-center">Notes</p>
      <Button to="/notes/create" text="Add new note" />
      {loading && <div>loading...</div>}
      {!data?.length && !loading && <div>There are no notes yet</div>}
      {data.map((note) => (
        <div
          key={note.id}
          className="flex justify-between p-7 text-left mt-3 items-center md:block md:relative md:pb-12 bg-slate-200"
        >
          <NavLink key={note.id} to={`/notes/view/${note.id}`}>
            <div className="flex items-center break-all">
              <p className="h-auto max-w-3xl">
                <b>{note.title}</b>
              </p>
            </div>
          </NavLink>
          <div className="flex ml-5 gap-3 md:absolute right-1 mt-3">
            <p className="h-auto font-thin">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
            <NavLink to={`/notes/edit/${note.id}`}>
              <CiEdit className="w-7 h-7" />
            </NavLink>
            <CiTrash
              className="w-7 h-7"
              onClick={() => {
                dispatch(deleteNote(note.id));
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
