import clsx from "clsx";


export interface ContactStatusBadgeProps {
    contactable: boolean
    className?: string
}

/**
 * A simple color coded badge to indicate the contact status of a user.
 *
 * @param {ContactStatusBadgeProps} props
 * @returns {JSX.Element}
 * @constructor
 */
export function ContactStatusBadge(props: ContactStatusBadgeProps) {

    const { contactable, className } = props;

    function getBadgeAttributes(contactable: boolean): [ colorClasses: string, text: string ] {

        if (contactable) {

            return [ "bg-green-100 text-green-800", "Contactable" ];

        }

        return [ "bg-red-100 text-red-800", "Do Not Contact" ];

    }

    const [ colorClasses, text ] = getBadgeAttributes(contactable);

    return (

        <span className={ clsx(
            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
            colorClasses,
            className
        ) }>

            { text }

        </span>

    )

}
