import { redirect } from "@remix-run/node";
import { logout } from "../../firebase";

export async function action() {
  logout();
}

export function loader() {
  return redirect("/characters");
}