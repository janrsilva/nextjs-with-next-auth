import { csrfToken } from 'next-auth/client'

export default function SignIn({ csrfToken }) {
    return (
        <form method='post' action='/api/auth/callback/credentials'>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <div>
                <label>
                    Username
                    <input name='username' type='text'/>
                </label>
            </div>
            <div>
                <label>
                    Password
                    <input name='password' type='text'/>
                </label>
            </div>
            <button type='submit'>Sign in</button>
        </form>
    )
}

SignIn.getInitialProps = async (context) => {
    return {
        csrfToken: await csrfToken(context)
    }
}