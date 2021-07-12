import { useMemo } from "react";
import { Skeleton } from "./skeleton";
import { Person } from "../model/person";
import { FullscreenModal } from "./fullscreen_modal";


export interface FrequencyCountModalProps {
    open: boolean
    onClose: () => void
    people: Person[]
    loading?: boolean
    error?: string
}

/**
 * Modal that shows the character frequency counts of {@link Person} email addresses.
 *
 * @param {FrequencyCountModalProps} props
 * @returns {JSX.Element}
 * @constructor
 */
export function FrequencyCountModal(props: FrequencyCountModalProps) {

    const { open, onClose, people, loading, error } = props;

    // Either a skeleton loader, error, or a list of character frequencies
    const frequencyCountElements = useMemo(() => {

        // Show a group of skeletons when loading
        if (loading) {

            return [ 1, 2, 3 ].map(num => <Skeleton key={ num }/>);

        }

        // Show the error in the horizontal center of the screen if one exists
        if (error) {

            return <h3 className="text-center mt-12">{ error }</h3>

        }

        // Frequencies are reduced to an object in the form "{ character: frequencyCount }"
        const frequencies = people.reduce<{ [key: string]: number }>((accumulator: {}, person: Person) => {

            const { email_address: emailAddress } = person;

            // Iterate through each character and add it to the count object
            emailAddress.split('').forEach(character => {

                if (accumulator[character]) {

                    accumulator[character] = accumulator[character] + 1;

                } else {

                    accumulator[character] = 1;

                }

            });

            return accumulator;

        }, {});

        // Assuming not loading and no error, map each frequency data to a data row
        return Object.entries(frequencies)
                     .sort(([ , valueA ], [ , valueB ]) => valueB - valueA)
                     .map(([ key, value ]) => (

                         <div key={ key } className="pl-2 py-2 grid grid-cols-3 gap-4">

                             <dt className="text-sm text-gray-700">
                                 { key }
                             </dt>

                             <dd className="text-sm text-gray-700">
                                 { value }
                             </dd>

                         </div>

                     ))

    }, [ loading, people, error ]);

    return (

        <FullscreenModal
            title="Frequency Count"
            open={ open }
            onClose={ onClose }>

            <div className="flex flex-col max-h-full">

                { /* Table looking static header */ }
                <dl className="mt-4">

                    <div className="py-5 grid grid-cols-3 gap-4">

                        <dt className="text-base font-medium text-gray-500">
                            Character
                        </dt>

                        <dd className="text-base font-medium text-gray-500">
                            Count
                        </dd>

                    </div>

                </dl>

                <div className="flex-1 overflow-y-scroll">

                    { frequencyCountElements }

                </div>

            </div>

        </FullscreenModal>

    )

}
