import Button from "../components/Button";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";

export default function Home() {
  const user = useSelector(selectUser);
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return (
    <div>
      <p className="font-bold text-6xl mb-16 text-center">About me</p>
      <p className="text-center">
        <b>Email:</b> {user.email}
      </p>
      <p className="text-center flex gap-3 justify-center mt-2 mb-10">
        <b>Date sign up:</b>
        {new Date(user.createdAt).toLocaleDateString("ru-RU", options)}
      </p>
      <Button to="/notes" text="Go to notes" />
    </div>
  );
}
