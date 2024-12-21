import Link from "next/link"
import Logo from "../app/static/Vector.png"
import Image from "next/image"
import Dashboard from '../app/static/Dashboard.png'
import Users from '../app/static/Student.png'
import Chapter from '../app/static/Chapter.png'
import Help from '../app/static/Help.png'
import Reports from '../app/static/Report.png'
import Settings from '../app/static/Setting.png'

const navItems = [
    {
        title: "Dashboard",
        icon: Dashboard,
        href: "/",
    },
    {
        title: "Students",
        icon: Users,
        href: "/students",
    },
    {
        title: "Chapter",
        icon: Chapter,
        href: "/chapter",
    },
    {
        title: "Help",
        icon: Help,
        href: "/help",
    },
    {
        title: "Reports",
        icon: Reports,
        href: "/reports",
    },
    {
        title: "Settings",
        icon: Settings,
        href: "/settings",
    },
]

export function MainNav() {
    return (
        <nav className="w-[200px] border-r bg-gray-50/40">
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <Image src={Logo} height={42} width={98} alt="logo" />
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                            >
                                <Image src={item.icon} height={18} width={20} alt="icon" />
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}