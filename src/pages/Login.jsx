import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Input from "../components/Input";
import Button from "../components/Button";
import User from "../utils/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user/actions";
import { selectUserError } from "../redux/user/selectors";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const error = useSelector(selectUserError);

  function handleLogin() {
    try {
      const user = User.parse({
        email,
        password,
      });

      dispatch(login(user.email, user.password)).then(() => {
        navigate("/");
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }

      console.error("Validation error:", err);
    }
  }

  return (
    <div className="w-3/4 mt-10 ml-auto mr-auto">
      <div className="grid gap-6 mb-6 md:grid-cols-1">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center dark:black">
          Login
        </h1>
        <div className="mb-6">
          <div className="block text-center mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Email address
          </div>
          <Input
            type="email"
            placeholder="email@gmail.com"
            onDataChange={setEmail}
          />
          {errors?.email?._errors && (
            <div className="text-red-400 text-center">
              {errors?.email?._errors[0]}
            </div>
          )}
        </div>
        <div className="mb-6">
          <div className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-black">
            Password
          </div>
          <Input type="password" onDataChange={setPassword} />
          {(error || errors?.password?._errors) && (
            <div className="text-red-400 text-center">
              {error || errors?.password?._errors[0]}
            </div>
          )}
        </div>
      </div>
      {errors && (
        <div className="text-red-400 text-center">{errors.message}</div>
      )}
      <Button text="Login" handleOnClick={handleLogin} />
      <div>
        <Button text="Sign Up" to="/signup" />
      </div>
    </div>
  );
}

export default Login;
