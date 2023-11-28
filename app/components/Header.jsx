import { NavLink } from "@remix-run/react";
import { Menu } from "@headlessui/react";
import { TbLogout, TbUser } from "react-icons/tb";

export default function Header({
    links = [],
    avatar,
    signedIn = false,
}) {
    const linkClasses = "hover:text-primary";
    const activeClasses = "text-primary underline";

    return (
        <header className="bg-grey-medium w-full py-4 px-4 text-white">
            <nav className="flex justify-between">
              <div>
                  <NavLink to="/" className={({isActive}) => isActive && linkClasses}> {/* If the current route is active, add the active classes, else add nothing */}
                      <span className="block text-lg font-bold">Home</span>
                  </NavLink>
              </div>
              <div>
                  {Boolean(links?.length) && (
                      <div className="flex items-center gap-4">
                          {links.map((link, index) => (
                              <NavLink
                              key={index}
                              to={link.url}
                              className={({ isActive }) =>
                                  linkClasses + isActive && activeClasses + link.url === ("/login/" || "/sign-up/") && "bg-red-medium"
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
                  : "/img/placeholderUser.png"
              }
              alt="Avatar"
            />
          </Menu.Button>
        </div>
          <Menu.Items className="absolute right-0 z-50 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="/my-profile/"
                      className={
                        "flex w-full items-center rounded-md px-2 py-2 text-sm" +
                        active && "bg-secondary"
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
                        active && "bg-secondary"
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