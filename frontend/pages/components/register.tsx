import React from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import InputHookform from "../components/input-hookform";
import { SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const USERS_URL = "http://localhost:8000/chatapp/user";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<InputType>();

  type InputType = {
    username: string;
    uuid: string;
    age: number;
    mail: string;
    callnumber: number;
  };

  const sendProfile: SubmitHandler<InputType> = (data) => {
    const sendProfile = { name: data.username };
    axios
      .post(USERS_URL, sendProfile)
      .then((res) => {
        axios.get(USERS_URL).then((res) => {
          console.log(res.data);
          const id = res.data[res.data.length - 1].id;
          router.push(`/select-chatroom/${id}`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const check = () => {
    console.log(router);
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
              placeholder="ほくし"
              //reigster関数をpropsで渡す
              register={register}
              name="username"
              errors={errors.username}
              RegisterOptions={{
                maxLength: { value: 5, message: "※5文字以内でご記入ください" },
                required: "※名前は必須です。",
              }}
            />
            <InputHookform
              entries="年齢"
              placeholder="20"
              register={register}
              name="age"
              errors={errors.age}
              RegisterOptions={{
                required: "※年齢は必須です。",
                pattern: {
                  value: /^[0-9]{2}$/,
                  message: "※正確な年齢をご記入ください",
                },
              }}
            />
            <InputHookform
              entries="メールアドレス"
              placeholder="hokuhoku0909@icloud.com"
              register={register}
              name="mail"
              errors={errors.mail}
              RegisterOptions={{
                required: "※メールアドレスは必須です。",
                pattern: {
                  value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                  message: "入力形式がメールアドレスではありません。",
                },
              }}
            />
            <InputHookform
              entries="電話番号"
              placeholder="090-1234-5678"
              register={register}
              name="callnumber"
              errors={errors.callnumber}
              RegisterOptions={{
                required: "※電話番号は必須です。",
                pattern: {
                  value: /^0\d{2,3}-\d{1,4}-\d{4}$/,
                  message: "正しい電話番号ではありません。",
                },
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
        <button onClick={check}>aa</button>
      </div>
    </>
  );
};

export default Register;
