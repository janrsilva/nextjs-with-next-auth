import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { getMe, getToken } from '../../../config/providers'

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
            // Configure one or more authentication providers
            providers: [
                Providers.Credentials({
                    name: "GAV",
                    async authorize(credentials) {
                        const tokens = await getToken(credentials)
                        if (!tokens) {
                            return null
                        }

                        /**
                         * @todo
                         * Here. Persist the account to database. USE 'tokens'
                         * mongo.create({...}) or mongo.update({...})
                         *
                         *
                         *
                         * Example Account: {
                         *    userId: Object([id]),
                         *    providerType: string, //use 'credentials',
                         *    providerId: string, //use 'gav',
                         *    providerAccountId: number, // use the [pessoa.id],
                         *    refreshToken: null,
                         *    accessToken: string, // use the [accessToken],
                         *    accessTokenExpires: null,
                         *    createdAt: date,
                         *    updatedAt: date
                         * }
                         */

                        const me = await getMe(tokens.access_token)
                        const user = {
                            name: me.nome,
                            email: me.email,
                        }

                        /**
                         * @todo
                         * Here. Persist the user to database. USE 'tokens'
                         * mongo.create({...}) or mongo.update({...})
                         *
                         *
                         *
                         * Example User: {
                         *    name: string,
                         *    email: string,
                         *    image: string, //use the image url,
                         *    createdAt: date,
                         *    updatedAt: date
                         * }
                         */
                        return user
                    },
                    credentials: {
                        client_id: { label: "", type: "hidden", placeholder: "", value: "client_id" },
                        client_secret: { label: "", type: "hidden", placeholder: "", value: "client_secret" },
                        username: {
                            label: "Email",
                            type: "text ",
                            placeholder: "E-mail",
                            value: "admin@gavclub.com.br"
                        },
                        password: {
                            label: "Senha",
                            type: "password",
                            placeholder: "Senha",
                            value: "admin"
                        }
                    }
                }),
                // ...add more providers here
                Providers.Google({
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET
                }),
            ],
            session: {
                jwt: true,
            },
            theme: 'light',
            // A database is optional, but required to persist accounts in a database
            database: process.env.DATABASE_URL,
        }
    )
}