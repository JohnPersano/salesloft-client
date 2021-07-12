import { Person } from "../model/person";
import { useMemo } from "react";
import { Skeleton } from "./skeleton";
import { ContactStatusBadge } from "./contact_status_badge";


export interface PeopleTableProps {
    people: Person[]
    loading?: boolean
    error?: string
    className?: string
}

/**
 * Table that shows a list of people by their name, email address, and contact availability.
 *
 * @param {PeopleTableProps} props
 * @returns {JSX.Element}
 * @constructor
 */
export function PeopleTable(props: PeopleTableProps) {

    const { people, loading = false, error = "", className } = props;

    // Should break this into a table heading component eventually
    const columnElements = [ "Name", "Title", "Status" ].map(column => {

        return (

            <th
                key={ column }
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                { column }

            </th>

        )

    });

    // Either a skeleton loader, error, or a list of people
    const tableBody = useMemo(() => {

        // Show a group of skeletons when loading
        if (loading) {

            return (

                <tr className="block w-full">

                    <td className="block w-full">

                        { [ 1, 2, 3, 4 ].map(num => <Skeleton key={ num } className="w-full"/>) }

                    </td>

                </tr>

            )

        }

        // Show the error in the center of the table if one exists
        if (error) {

            return (

                <tr className="block w-full h-full">

                    <td className="block w-full h-full">

                        <div className="w-full h-full flex items-center justify-center">
                            <h3>{ error }</h3>
                        </div>

                    </td>

                </tr>

            )

        }

        // Assuming not loading and no error, map each person data to a table row
        return people.map(person => {

            const {
                first_name, last_name,
                display_name,
                email_address,
                title,
                do_not_contact
            } = person;

            // TODO: Assuming names are NEVER null here, check with server guys
            const initials = `${ first_name[0] }${ last_name[0] }`;

            return (

                <tr
                    key={ email_address }
                    className="table table-fixed w-full">

                    { /* Initials, display name, and email address */ }
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">

                            <div
                                className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-gray-200">
                                <span>{ initials }</span>
                            </div>

                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                    { display_name }
                                </div>
                                <div className="text-sm text-gray-500">
                                    { email_address }
                                </div>
                            </div>

                        </div>
                    </td>

                    { /* Job title*/ }
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                            { title }
                        </div>
                    </td>

                    { /* Contact badge */ }
                    <td className="px-6 py-4 whitespace-nowrap">
                        <ContactStatusBadge contactable={ !do_not_contact }/>
                    </td>

                </tr>

            )

        })

    }, [ loading, people, error ]);

    return (

        <div className={ className }>

            <div className="flex flex-col">

                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">

                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">

                        <div className="overflow-hidden border border-gray-200 sm:rounded-lg">

                            <table className="min-w-full divide-y divide-gray-200">

                                <thead className="bg-gray-50 table table-fixed w-full">

                                    <tr>{ columnElements }</tr>

                                </thead>

                                <tbody className="block overflow-y-scroll h-96 bg-white divide-y divide-gray-200">

                                    { tableBody }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}
