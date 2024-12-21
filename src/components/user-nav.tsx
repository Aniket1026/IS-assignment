import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Notifications from '../app/static/Notification.png'
import Settings from '../app/static/Settings-top.png'
import Messages from '../app/static/Message.png'
import Help from '../app/static/Help.png'
import TopNavButton from "./top-nav-button"

export function UserNav() {
    return (
        <div className="flex items-center gap-4">
            <TopNavButton Icon={Help} />
            <TopNavButton Icon={Messages} />
            <TopNavButton Icon={Settings} />
            <TopNavButton Icon={Notifications} />
            <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>AD</AvatarFallback>
            </Avatar>

            <div className="text-sm">
                <p className="font-medium">Adeline H. Dancy</p>
            </div>
        </div>
    )
}