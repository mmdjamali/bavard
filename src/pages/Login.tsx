import React , { useState } from "react"
import { LoginInput , PasswordInput } from '../components/inputs'
import { FullWidthButton , AuthProviderButton } from "../components/buttons";
import { AuthDivider } from "../components/dividers";
import { MdEmail , MdVpnKey } from 'react-icons/md';
import { BsGoogle } from "react-icons/bs"
import { Link } from "react-router-dom";
import supabase from "../libs/supabase";

function Login() {

  const [username , setUsername]  = useState<string>("")
  const [password , setPassword]  = useState<string>("")
  const [loading , setLoading]  = useState<boolean>(false)

  const LoginWithEmail = async (e: React.FormEvent<HTMLFormElement>, email: string , password: string) => {
    e.preventDefault()

    if(password === "" || username === "") return
     
    const { data , error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    console.log(error,data)

  }

  return (
    <form
    onSubmit={async (e) => {
      setLoading(true)
      console.log("true")
      await LoginWithEmail(e, username, password)
      console.log("false")
      setLoading(false)
    }}
    className={`
    flex flex-col w-[min(80%_,_18rem)] my-auto
    `}>

      <p
      className="
      text-center text-[2rem] font-semibold
    text-neutral-800
      "
      >
        Welcome Back!
      </p>

      <p
      className="
      text-center text-[1rem] text-neutral-600
      mb-[3rem]
      "
      >
        Login to your account
      </p>

              <LoginInput
              value={username}
              setValue={setUsername}
              pattern={/^\S+@\S+\.\S+$/}
              icon={<MdEmail/>}
              placeholder="Email"
              sx="mb-4"
              />
              <PasswordInput
              value={password}
              setValue={setPassword}
              icon={<MdVpnKey/>}
              placeholder="Password"
              />
              <Link
              to="/hello"
              className="
              text-[.9rem]
              underline
              text-violet-500
              mt-1
              ">
                Forget password?
              </Link>

              <FullWidthButton
              title="Login"
              sx="mt-4"
              loading={loading}
              />

              <AuthDivider/>

              <AuthProviderButton
              icon={<BsGoogle/>}
              provider="Google"
              onClick={() => {
                supabase.auth.signOut()
                .then(() => {
                  console.log("yo")
                })
              }}
              sx=""
              />

    </form>
  )
}

export default Login
