import { useState } from "react";
import { z } from "zod";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import User from "../utils/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/user/actions";
import { selectUserError } from "../redux/user/selectors";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [userExist, setUserExist] = useState(false);
  const [errors, setErrors] = useState(null);

  const error = useSelector(selectUserError);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleSignUp() {
    try {
      setUserExist(false);

      if (password !== repeatPassword) {
        setPasswordsMatch(false);
        throw new Error("Passwords don't match");
      }

      const user = User.parse({
        email,
        password,
      });

      setErrors(null);

      dispatch(register(user.email, user.password)).then(() => {
        navigate("/");
      });
    } catch (err) {
      console.error(err);
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  }

  return (
    <div className="items-center mt-10 mb-10 w-3/4 ml-auto mr-auto">
      <div className="grid gap-6 mb-6 md:grid-cols-1">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:black text-center">
          Sign Up
        </h1>
        <div className="mb-6">
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-center">
            Email address
          </div>
          <Input
            type="email"
            placeholder="email@gmail.com"
            onDataChange={setEmail}
          />
          {errors?.email && (
            <div className="text-red-400 text-center">
              {errors?.email?._errors}
            </div>
          )}
        </div>
        <div className="mb-6">
          <div className="block mb-2  text-center text-sm font-medium text-gray-900 dark:text-black">
            Password
          </div>
          <Input type="password" onDataChange={setPassword} />
          {(error || errors?.password) && (
            <div className="">
              <div className="text-red-400 text-center">
                {error || errors?.password?._errors}
              </div>
            </div>
          )}
        </div>
        <div className="mb-6">
          <div className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-black">
            Confirm password
          </div>
          <Input
            type="password"
            onDataChange={(value) => {
              setRepeatPassword(value);
              setPasswordsMatch(true);
            }}
          />
          {!passwordsMatch && (
            <div className="text-red-400 text-center">
              Passwords do not match
            </div>
          )}
          {userExist && (
            <div className="text-red-400 text-center">
              A user with this email exists
            </div>
          )}
        </div>
      </div>
      <Button text="Sign Up" handleOnClick={handleSignUp} />
      <div>
        <Button text="Login" to="/login" />
      </div>
    </div>
  );
}
