## This is a Nextjs sample to login to GAV.

The project is able to:
- login an user with GAV username and password
- login an user with Google account

### to intall
- run
```bash
$ npm i
```
- create a copy of `.env.sample` to a `.env` file
- set all environments in `.env`

### to copy to another project
- install the next-auth
- install some rest-client like axios
- intall mongodb if you choose use this
- create a copy of `.env.sample` to a `.env` file
- set all environments in `.env`
- create the custom login page /pages/auth/
- credentials-signin.js or use `signIn('credentials', { username: 'jsmith', password: '1234' })`

Google
- set the process.env.GOOGLE_CLIENT_ID and process.env.GOOGLE_CLIENT_SECRET


> IMPORTANT!

There are three notes `@todo` in the code explaining what todo with a token, user and account.

To know how to use the next-auth credentials. [read this](https://next-auth.js.org/configuration/providers#sign-in-with-credentials)

Always that an user login with GAV credentials, you should:

- create or update the user to the database;
- create or update the account;
- send the social token to the GAV API;

````js
//pages/api/auth/[...nextauth].js
export default (req, res) => {
    return NextAuth(
        req,
        res,
        {
            events: {
                signIn: async (message) => {
                    if (message.isNewUser) {
                        /**
                         * @todo
                         * Here. POST token to GAV API in /auth/social/facebook or /auth/social/google
                         * Save the response token in user record.
                         */
                    }
                },
            },
        ...
```