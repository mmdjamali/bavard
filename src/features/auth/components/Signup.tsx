import React , {useState} from 'react'
import { LoginInput , PasswordInput } from '../../../components/inputs'
import { FullWidthButton , AuthProviderButton } from "../../../components/buttons";
import { AuthDivider } from "../../../components/dividers";
import { MdEmail , MdVpnKey , MdPerson , MdCheck} from 'react-icons/md';
import { BsGoogle } from "react-icons/bs"
import { SignUpWithEmail } from '../utils';
import { TypographyLG , TypographySM } from "../../../components/typographies";

const Signup :React.FC = () => {
    const [email , setEmail]  = useState<string>("")
    const [password , setPassword]  = useState<string>("")
    const [confirm , setConfirm]  = useState<string>("")
    const [loading , setLoading]  = useState<boolean>(false)
  
    return (
      <form
      onSubmit={ async (e) => {
        setLoading(true)
        await SignUpWithEmail(e , email , password)
        setLoading(false)
      }}
        className={`
      flex flex-col w-[min(80%_,_18rem)] my-auto
      `}>

        <TypographyLG
        text="Welcome!"
        />

        <TypographySM
        text="Create an account and join us!"
        />

        <LoginInput
        value={email}
        setValue={setEmail}
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