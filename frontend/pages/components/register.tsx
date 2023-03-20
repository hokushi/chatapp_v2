import React from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import InputHookform from "../components/input-hookform";
import { SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const USERS_URL = "http://localhost:3130/chat/userinfo";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<InputType>();

  type InputType = {
    name: string;
    username: string;
    email: string;
    password: number;
  };

  const sendProfile: SubmitHandler<InputType> = (data) => {
    const id=uuid()
    const sendProfile = { name: data.name , username: data.username, userid: id, email: data.email, password: data.password};
    console.log(sendProfile)
    axios
      .post(USERS_URL, sendProfile)
      .then((res) => {
        axios.get(USERS_URL).then((res) => {
          console.log(res.data);
          router.push(`select/${id}`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <div className="bg-gray-300 h-screen">
        <h1 className="text-5xl flex justify-center pt-10 font-normal">
          登録フォーム
        </h1>
        <div>
          <form onSubmit={handleSubmit(sendProfile)} className="mt-5">
            <InputHookform
              entries="名前"
              placeholder="通知太郎"
              //reigster関数をpropsで渡す
              register={register}
              name="name"
              errors={errors.name}
              type={"text"}
              RegisterOptions={{
                maxLength: { value: 10, message: "※10文字以内でご記入ください" },
                required: "※名前は必須です。",
              }}
            />
            <InputHookform
              entries="ユーザーネーム"
              placeholder="通太郎"
              //reigster関数をpropsで渡す
              register={register}
              name="username"
              errors={errors.username}
              type={"text"}
              RegisterOptions={{
                maxLength: { value: 10, message: "※10文字以内でご記入ください" },
                required: "※ユーザーネームは必須です。",
              }}
            />
            <InputHookform
              entries="メールアドレス"
              placeholder="hokuhoku0909@icloud.com"
              register={register}
              name="email"
              errors={errors.email}
              type={"text"}
              RegisterOptions={{
                required: "※メールアドレスは必須です。",
                pattern: {
                  value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                  message: "入力形式がメールアドレスではありません。",
                },
              }}
            />
            <InputHookform
              entries="パスワード"
              placeholder=""
              register={register}
              name="password"
              errors={errors.password}
              type={"password"}
              RegisterOptions={{
                minLength: { value: 4, message: "※4文字以上でご記入ください" },
                required: "※パスワードは必須です。",
                
              }}
            />
            <div className="grid grid-cols-11">
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 mt-8 border-b-4 border-gray-700 hover:border-gray-500 rounded col-start-3 col-end-10"
              >
                送信
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
