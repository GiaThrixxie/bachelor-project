import { redirect } from "@remix-run/node";
import { signOut } from "../../session.server";

export async function action({ request }) {
  return signOut(request);
}

export function loader() {
  return redirect("/characters");
}