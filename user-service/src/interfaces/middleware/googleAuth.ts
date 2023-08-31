import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport'
import { googleAuth } from '../../utils/googleAuth';
const { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET, GOOGLE_AUTH_CALL_BACK_URL } = process.env
if (!GOOGLE_AUTH_CLIENT_ID || !GOOGLE_AUTH_CLIENT_SECRET || !GOOGLE_AUTH_CALL_BACK_URL) {
    throw new Error('Missing Google API credentials or callback URL');
}
export const googleAuthMiddleware = () => {


    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_AUTH_CLIENT_ID,
                clientSecret: GOOGLE_AUTH_CLIENT_SECRET,
                callbackURL: GOOGLE_AUTH_CALL_BACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {

                    console.log(accessToken, 'access', refreshToken, 'ref', profile, 'profi', done, 'done');
                    const userData: any = await googleAuth(profile)
                    console.log(userData, '//////userData');

                    return done(null, userData);
                }
                catch (error: any) {
                    console.log(error, '///////');

                    return done(error, false);
                }
            }
        )
    );
}
