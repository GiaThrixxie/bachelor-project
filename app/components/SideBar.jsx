import { NavLink } from "@remix-run/react";
import { Menu } from "@headlessui/react";

export default function SideBar({
    title,
    sections = [],
}) {
    const linkClasses = "hover:text-red-medium";
    const activeClasses = "text-primary underline";

    return (
        <aside className="bg-dark w-1/5 h-screen">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
                <nav className="flex items-center justify-between">
                    <div>
                        <NavLink to="/" className={({isActive}) => isActive && linkClasses}> {/* If the current route is active, add the active classes, else add nothing */}
                            <span className="block text-lg font-bold">{title}</span>
                        </NavLink>
                    </div>
                    {Boolean(sections?.length) && (
                        <div className="flex items-center gap-4">
                            {sections.map((section, index) => (
                                section.subSections || section.createNewOption ? 
                                <Dropdown key={index} title={section.title} subSections={section.subSections} createNewOption={section.createNewOption}/>
                                : 
                                <NavLink key={index} to={section.url} className={({isActive}) => linkClasses + isActive && activeClasses}>
                                    <span className="block text-lg font-bold">{section.title}</span>
                                </NavLink>
                            ))}
                        </div>
                    )}
                </nav>
            </div>
        </aside>
    );
}

/*{sections.map((section, index) => (
    {section.subSections ? <Dropdown title={section.title} sections={section.subSections} />
     : 
    <NavLink to={section.url} className={({isActive}) => isActive && linkClasses}><span className="block text-lg font-bold">{section.title}</span></NavLink>}
))}*/
//title: ,
//sections: [{title: , url: "/", createNewOption: {title: , url:"/" } subSections: [{title: , to: "/", type: "character" || "campaign" || "singleLine" || "doubleLine"}]}




export function Dropdown({ title, subSections, createNewOption }) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="aspect-square w-10 overflow-hidden rounded-full border bg-white shadow transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-50">
            {title}
          </Menu.Button>
        </div>
          <Menu.Items className="absolute right-0 z-50 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {subSections && subSections.map((subSection, index) => (
                <Menu.Item key={index}>
                    {({ active }) => (
                    <NavLink
                        to={subSection.url}
                        className={
                        "flex w-full items-center rounded-md px-2 py-2 text-sm overflow-hidden" +
                        active && "bg-red-medium"
                        }
                    >
                        {subSection.leftIMG && <img src={subSection.leftIMG} width={40} height={40} alt={subSection.title} className="ml-4"/>}
                        <div className="mr-2 h-5 w-5">
                            <p>{subSection.title}</p>
                            {subSection.subTitle && <h4>{subSection.subTitle}</h4>}
                        </div>
                        {subSection.rightIMG && <img src={subSection.rightIMG} width={40} height={40} alt={subSection.title} className="absolute -right-2"/>}
                    </NavLink>
                    )}
                </Menu.Item>
            ))}
            {createNewOption && 
                <Menu.Item>
                    {({ active }) => (
                    <NavLink
                        to={createNewOption.url}
                        className={
                        "flex w-full items-center rounded-md px-2 py-2 text-sm" +
                        active && "bg-red-medium"
                        }
                    >
                        <div className="mr-2 h-5 w-5">{createNewOption.title}</div>
                    </NavLink>
                    )}
                </Menu.Item>
            }
          </Menu.Items>
      </Menu>
    );
  }