import "dotenv/config.js";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { getSessionToken, signOutFirebase, adminAuth } from "./firebase";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) throw new Error("SESSION_SECRET is missing");

const storage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        secure: true,
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
    },
});

async function createUserSession(idToken, redirectTo) {
    const token = await getSessionToken(idToken);
    const session = await storage.getSession();
    session.set("token", token);

    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        },
    });
}

async function getUserSession(request) {
    const session = await storage.getSession(request.headers.get("Cookie"));
    const token = session.get("token");

    if (!token) return null;

    try {
        const tokenUser = await adminAuth.verifySessionCookie(token, true);
        return tokenUser;
    } catch (error) {
        return null
    }

}

async function destroySession(request) {
    const session = await storage.getSession(request.headers.get("Cookie"));
    const newCookie = await storage.destroySession(session);

    return redirect("/characters", {
        headers: {
            "Set-Cookie": newCookie,
        },
    });
}

async function signOut(request) {
    await signOutFirebase();
    return await destroySession(request);
}

export { createUserSession, signOut, getUserSession };