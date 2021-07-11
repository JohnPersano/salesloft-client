import clsx from "clsx";


export interface SkeletonProps {
    className?: string
}

/**
 * Generic multi-row skeleton loader.
 *
 * @param {SkeletonProps} props
 * @returns {JSX.Element}
 * @constructor
 */
export function Skeleton(props: SkeletonProps) {

    const { className } = props;

    return (

        <div className={ clsx("flex", className) }>

            <div className="p-4 w-full">

                <div className="animate-pulse flex space-x-4">

                    <div className="rounded-full bg-gray-300 h-12 w-12"/>

                    <div className="flex-1 space-y-4 py-1">

                        <div className="h-4 bg-gray-300 rounded w-3/4"/>

                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded"/>
                            <div className="h-4 bg-gray-300 rounded w-5/6"/>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}
