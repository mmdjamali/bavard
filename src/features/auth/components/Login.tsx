import React , { useState } from "react"
import { LoginInput , PasswordInput } from '../../../components/inputs'
import { FullWidthButton , AuthProviderButton } from "../../../components/buttons";
import { AuthDivider } from "../../../components/dividers";
import { MdEmail , MdVpnKey } from 'react-icons/md';
import { BsGoogle } from "react-icons/bs"
import { Link } from "react-router-dom";
import supabase from "../../../libs/supabase";
import { TypographyLG , TypographySM } from "../../../components/typographies";
import { signInWithLinkedin } from "../utils";
import { RiLinkedinBoxFill } from "react-icons/ri";

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
  }

  return (
    <form
    onSubmit={async (e) => {
      setLoading(true)
      await LoginWithEmail(e, username, password)
      setLoading(false)
    }}
    className={`
    flex flex-col w-[min(80%_,_18rem)] my-auto
    `}>

      <TypographyLG
      text="Welcome Back!"
      />

      <TypographySM
      text="Login to your account"
      />

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
              icon={<RiLinkedinBoxFill/>}
              provider="Linkedin"
              onClick={() => {
                signInWithLinkedin()
              }}
              sx=""
              />

    </form>
  )
}

export default Login
