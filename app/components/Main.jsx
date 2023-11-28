import SideBar from "./SideBar";

export default function Main ({ sidebarType, children, paddingY }) {
    return (
        <>
            <SideBar type={sidebarType}/>
            <main
            className=
                {`mx-auto max-w-screen-sm px-6 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl ${paddingY && "py-6"}`}
            >
                {children}
            </main>
        </>
    );
  }