import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Notifications from "../app/static/Notification.png";
import Settings from "../app/static/Settings-top.png";
import Messages from "../app/static/Message.png";
import Help from "../app/static/Help.png";
import TopNavButton from "./top-nav-button";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const MobileDropdownMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <ChevronDown className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <Image src={Help} alt="Help" className="mr-2 h-4 w-4" />
        <span>Help</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Image src={Messages} alt="Messages" className="mr-2 h-4 w-4" />
        <span>Messages</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Image src={Settings} alt="Settings" className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Image
          src={Notifications}
          alt="Notifications"
          className="mr-2 h-4 w-4"
        />
        <span>Notifications</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export function UserNav() {
  return (
    <div className="flex items-center gap-1 md:gap-4">
      <div className="hidden md:flex md:items-center md:gap-4">
        <TopNavButton Icon={Help} />
        <TopNavButton Icon={Messages} />
        <TopNavButton Icon={Settings} />
        <TopNavButton Icon={Notifications} />
      </div>
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
      <MobileDropdownMenu />
      <div className="hidden sm:block">
        <p className="text-sm font-medium">Adeline H. Dancy</p>
      </div>
    </div>
  );
}