

export default function Main ({ children, paddingR }) {
    return (
        <>
            <main
            className=
                {`mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl pb-12 pt-8 ${paddingR? "px-14" : "pl-14"}`}
            >
                {children}
            </main>
        </>
    );
  }