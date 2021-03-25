import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
  const [session, loading] = useSession()

  return <>
    {!session && <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>}
    <div>
      {JSON.stringify(session)}
    </div>
    {!session && <>
      <a href="http://localhost:3000/auth/credentials-signin">
        <button>Go To Custom Page</button>
      </a>
    </>}
  </>
}