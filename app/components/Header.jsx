import { NavLink } from "@remix-run/react";
import { Menu } from "@headlessui/react";
import { TbLogout, TbUser } from "react-icons/tb";

export default function Header({
    links = [],
    avatar,
    signedIn = false,
}) {
    const linkClasses = "hover:text-red-medium";
    const activeClasses = "text-red-medium underline";

    return (
        <header className="bg-grey-medium w-full max-w-screen text-white p-2">
            <nav className="flex justify-between items-center">
              <div>
                  <NavLink to="/" className={({isActive}) => isActive && linkClasses}> {/* If the current route is active, add the active classes, else add nothing */}
                      <span className="block text-lg font-bold px-4">Home</span>
                  </NavLink>
              </div>
              <div>
                  {Boolean(links?.length) && (
                      <div className="flex items-center gap-4">
                          {links.map((link, index) => (
                              <NavLink
                              key={index}
                              to={link.url}
                              className={`${({ isActive }) =>
                                  linkClasses + isActive && activeClasses} ${(link.url === "/login/" || link.url === "/sign-up/") && "bg-red-medium text-white hover:text-white hover:bg-red-light h-full py-2 px-4 rounded-xl"}`
                              }
                              >
                                  {link.title}
                              </NavLink>
                          ))}
                      </div>
                  )}
                  {signedIn && <Dropdown avatar={avatar} />}
              </div>
            </nav>
        </header>
    );
}

export function Dropdown({ avatar }) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="aspect-square w-10 overflow-hidden rounded-full border bg-grey-darker shadow transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-50">
            <img
              src={
                avatar
                  ? avatar
                  : "/img/placeholder_character_small.jpg"
              }
              alt="Avatar"
            />
          </Menu.Button>
        </div>
          <Menu.Items className="absolute right-0 z-50 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-grey-lighter">
            <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="/my-profile/"
                      className={
                        "flex w-full items-center rounded-md px-2 py-2 text-sm" +
                        active && "bg-red-medium"
                      }
                    >
                      <div className="mr-2 h-5 w-5"><TbUser size={20} /></div>
                      My profile
                    </NavLink>
                  )}
                </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <form method="post" action="/logout">
                    <button
                      className={
                        "flex w-full items-center rounded-md px-2 py-2 text-sm" +
                        active && "bg-red-medium"
                      }
                    >
                      <div className="mr-2 h-5 w-5">
                        <TbLogout size={20} />
                      </div>
                      Logout
                    </button>
                  </form>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
      </Menu>
    );
  }