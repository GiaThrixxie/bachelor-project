

export default function Main ({ children, paddingR }) {
    return (
        <>
            <main
            className=
                {`mx-auto w-full h-full pb-12 pt-8 ${paddingR? "px-14" : "pl-14"}`}
            >
                {children}
            </main>
        </>
    );
  }