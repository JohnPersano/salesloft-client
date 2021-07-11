import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import { Person } from "../model/person";

import { ContactStatusBadge } from "../components/contact_status_badge";
import { Skeleton } from "../components/skeleton";


// noinspection JSUnusedGlobalSymbols
export default function PeopleData() {

    const [ people, setPeople ] = useState([]);
    const [ peopleLoading, setPeopleLoading ] = useState(false);
    const [ peopleError, setPeopleError ] = useState("");

    // On page load, hit the people endpoint and save the response (or error) in state
    useEffect(() => {

        setPeopleLoading(true);

        (async () => {

            try {

                const { data } = await axios.get("/api/people");
                setPeople(data);

            } catch (error) {

                setPeopleError("Failed to fetch people data");

            }

            setPeopleLoading(false);

        })();

    }, []);

    return (

        <div className="py-36 bg-white">

            <div className="max-w-7xl mx-auto px-4
                            sm:px-6
                            lg:px-8">

                { /* Title section */ }
                <div>
                    <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                        SalesLoft Client
                    </h2>

                    <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
                        People Data
                    </p>

                    <p className="mt-4 max-w-2xl text-xl text-gray-500">
                        A list of those included in the SalesLoft API is included below.
                    </p>
                </div>

                { /* Table section */ }
                <PeopleTable
                    className="mt-10"
                    people={ people }
                    loading={ peopleLoading }
                    error={ peopleError }
                />

                { /* Analytics section */ }
                <div className="mt-12 bg-gray-50">

                    <div className="max-w-7xl mx-auto py-6 px-4
                                    sm:px-6
                                    lg:py-10 lg:px-8 lg:flex lg:items-center lg:justify-between">

                        <div>
                            <h3 className="block text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Data Analytics
                            </h3>

                            <p className="mt-2 max-w-2xl text-xl text-gray-500">
                                A list of those included in the SalesLoft API is included below.
                            </p>
                        </div>

                        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">

                            <div className="inline-flex rounded-md shadow">

                                <a
                                    className="inline-flex items-center justify-center px-5 py-3
                                               border border-transparent text-base font-medium rounded-md
                                               text-white bg-indigo-600 hover:bg-indigo-700"
                                    href="#">

                                    Frequency Count
                                </a>

                            </div>

                            <div className="ml-3 inline-flex rounded-md shadow">

                                <a
                                    className="inline-flex items-center justify-center px-5 py-3
                                               border border-transparent text-base font-medium rounded-md
                                               text-blue-500 bg-white hover:bg-gray-200"
                                    href="#">

                                    Suggested Duplicates

                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}


interface PeopleTableProps {
    people: Person[]
    loading?: boolean
    error?: string
    className?: string
}

function PeopleTable(props: PeopleTableProps) {

    const { people, loading, error, className } = props;

    const columnElements = [ "Name", "Title", "Status" ].map(column => {

        return (

            <th scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                { column }

            </th>

        )

    });

    const tableBody = useMemo(() => {

        // Show a group of skeletons when loading
        if (loading) {

            return [ 1, 2, 3, 4 ].map(_ => <Skeleton className="w-full"/>)

        }

        // Show the error in the center of the table if one exists
        if (error) {

            return (

                <div className="w-full h-full flex items-center justify-center">
                    <h3>{ error }</h3>
                </div>

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

            const initials = `${ first_name[0] }${ last_name[0] }`;

            return (

                <tr className="table table-fixed w-full">

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

                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900"> { title }
                        </div>
                    </td>
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

