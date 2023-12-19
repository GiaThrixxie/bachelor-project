export default function Section ({ children, title, height, width, backgroundColour, bodyClassNames, itemsOnTitleLine = ""}) {
    return (
        <section
        className=
            {`flex flex-col mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl py-6 px-5 ${width} ${height} ${backgroundColour}`}
        >
            {title && itemsOnTitleLine ?
            <div className="flex justify-between items-center mb-7">
                <h2>{title}</h2>
                <div className="flex">
                    {itemsOnTitleLine}
                </div>
            </div>
            :
            title && <h2 className="mb-7">{title}</h2>}
            <div className={`${bodyClassNames}`}>
                {children}
            </div>
        </section>
    );
  }

/*
{title && itemsOnTitleRow ?
<div className="flex justify-between items-center mb-7">
    <h2 className="mb-0">{title}</h2>
    <div className="flex">
        {itemsOnTitleRow}
    </div>
</div>
:
title && <h2 className="mb-7">{title}</h2>}
 */