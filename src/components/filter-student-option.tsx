import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "./ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Button } from "./ui/button"

interface FilterStudentOptionsProps {
    defaultValue: string;
    options: string[];
}

const FilterStudentOptions = ({ defaultValue, options }: FilterStudentOptionsProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {defaultValue}
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options.map((option, index) => (
                    <DropdownMenuItem key={index}>{option}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default FilterStudentOptions