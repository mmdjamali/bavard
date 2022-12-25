import React , {useState} from 'react'
import { LoginInput , PasswordInput } from '../components/inputs'
import { FullWidthButton , AuthProviderButton } from "../components/buttons";
import { AuthDivider } from "../components/dividers";
import { MdEmail , MdVpnKey , MdPerson , MdCheck} from 'react-icons/md';
import { BsGoogle } from "react-icons/bs"

import supabase from '../libs/supabase'

const SignUpWithEmail = async (e: React.FormEvent<HTMLFormElement>, email: string , password: string) => {
  e.preventDefault()
   const { data , error } = await supabase.auth.signUp({
    email,
    password
  })
}

const Signup :React.FC = () => {
    const [username , setUsername]  = useState<string>("")
    const [password , setPassword]  = useState<string>("")
    const [confirm , setConfirm]  = useState<string>("")
    const [loading , setLoading]  = useState<boolean>(false)
  
    return (
      <form
      onSubmit={ async (e) => {
        setLoading(true)
        await SignUpWithEmail(e , username , password)
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
          Welcome!
        </p>

        <p
        className="
        text-center text-[1rem] text-neutral-600
        mb-[3rem]
        "
        >
          Create an account and join us!
        </p>

        <LoginInput
        value={username}
        setValue={setUsername}
        pattern={/./}
        icon={<MdPerson/>}
        placeholder="Name"
        sx="mb-4"
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
        sx="mb-4"
        />

        <PasswordInput
        value={confirm}
        setValue={setConfirm}
        icon={<MdCheck/>}
        placeholder="confirm"
        pass={password}
        />

        <FullWidthButton
        title="Create account"
        sx="mt-4"
        loading={loading}
        />

        <AuthDivider/>

        <AuthProviderButton
        icon={<BsGoogle/>}
        provider="Google"
        onClick={() => {}}
        sx=""
        />

      </form>
    )
}

export default Signup