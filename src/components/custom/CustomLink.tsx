import { cn } from "cn";
import { Link } from "react-router";

interface Props {
    text: string;
    to: string;
    active?: boolean
}

export const CustomLink = ({ text = 'Link', to = '/', active = false }: Props) => {
    return (
        <Link to={to} className={cn(`text-sm font-medium transition-colors hover:text-primary`, active && 'underline underline-offset-4')}>
            {text}
        </Link>
    )
}
