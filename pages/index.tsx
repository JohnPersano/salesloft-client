import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { peopleRequestState } from "../recoil/people_atom";
import { PeopleTable } from "../components/people_table";
import { FrequencyCountModal } from "../components/frequency_count_modal";


// noinspection JSUnusedGlobalSymbols
export default function PeopleData() {

    const peopleRequest = useRecoilValue(peopleRequestState);
    const { loading: peopleLoading, data: people, error: peopleError } = peopleRequest;

    const setPeopleRequest = useSetRecoilState(peopleRequestState);

    const [ frequencyCountModalOpen, setFrequencyCountModalOpen ] = useState(false);

    // On page load, hit the people endpoint and save the response (or error) in state
    useEffect(() => {

        setPeopleRequest(previousRequest => ({ ...previousRequest, loading: true }));

        (async () => {

            try {

                const { data } = await axios.get("/api/people");
                setPeopleRequest({ loading: false, data: data, error: "" });

            } catch (error) {

                setPeopleRequest({ loading: false, data: [], error: "Failed to fetch people data" });

            }

            setPeopleRequest(previousRequest => ({ ...previousRequest, loading: false }));

        })();

    }, []);

    // Called when the frequency button is clicked, opens the frequency modal
    function handleFrequencyModalOpen() {

        setFrequencyCountModalOpen(true);

    }

    // Called by the exit handles of the modal, closes the modal
    function handleFrequencyModalClose() {

        setFrequencyCountModalOpen(false);

    }

    return (

        <div className="py-36 bg-white">

            <FrequencyCountModal
                open={ frequencyCountModalOpen }
                onClose={ handleFrequencyModalClose }
                people={ people }
                loading={ peopleLoading }
                error={ peopleError }
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                <div className="mt-12">

                    <div className="max-w-7xl mx-auto py-6 px-4
                                    sm:px-6
                                    lg:py-10 lg:px-8 lg:flex lg:items-center lg:justify-between">

                        { /* Title */ }
                        <div>
                            <h3 className="block text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Data Analytics
                            </h3>

                            <p className="mt-2 max-w-2xl text-lg text-gray-500">
                                A list of those included in the SalesLoft API is included below.
                            </p>
                        </div>

                        { /* Buttons */ }
                        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">

                            <div className="inline-flex rounded-md shadow">
                                <a className="inline-flex items-center justify-center px-5 py-3
                                               border border-transparent text-base font-medium rounded-md
                                               text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                                   onClick={ handleFrequencyModalOpen }>

                                    Frequency Count
                                </a>
                            </div>

                            <div className="ml-3 inline-flex rounded-md">
                                <a className="inline-flex items-center justify-center px-5 py-3 text-gray-400
                                               border border-transparent text-base font-medium rounded-md
                                               bg-gray-100 cursor-not-allowed">

                                    Suggested Duplicates

                                    <span className="text-xs ml-2">(coming soon!)</span>
                                </a>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}
