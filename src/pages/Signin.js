import React from 'react'
import { useState } from 'react'
import { useAuth } from '../Auth/auth'
import Layout from '../components/Layout'

function Signin() {
    const auth = useAuth()
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSignIn = async (e) => {
        e.preventDefault()

       const signIn = await auth.login(email)

       if (signIn.error) {
           setMessage(signIn.error.message)
       } else {
           setMessage("Magic link has been sent")
       }
       setEmail("")



    }
    

    return (
        <Layout>
            {message && message}
            <h1>Sign-in</h1>

            <form onSubmit={handleSignIn}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit">Sign In</button>
            </form>
        </Layout>
    )
}

export default Signin
