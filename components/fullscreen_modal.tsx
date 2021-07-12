import { Fragment, ReactNode } from "react";
import { Transition } from '@headlessui/react'


export interface FullscreenModalProps {
    title: string
    children: ReactNode | ReactNode[]
    open: boolean
    onClose: () => void
}

/**
 * Generic material-style full screen modal with transitions and backdrop.
 *
 * @param {FullscreenModalProps} props
 * @returns {JSX.Element}
 * @constructor
 */
export function FullscreenModal(props: FullscreenModalProps) {

    const { title, children, open, onClose } = props;

    // Called when the backdrop of the modal is clicked, notifies the parent callback
    function handleBackdropClick() {

        onClose();

    }

    return (

        <div>

            <Transition
                show={ open }
                enter="transition-opacity duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">

                <div
                    className="fixed inset-0 opacity-60 bg-black z-20"
                    onClick={ handleBackdropClick }
                />

            </Transition>

            <Transition
                show={ open }
                as={ Fragment }
                enter="transition ease-in-out duration-200 transform-gpu"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transition ease-in-out duration-200 transform-gpu"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full">

                <div className="fixed bottom-0 inset-x-0 h-3/4 p-8 bg-white z-50 rounded-t-2xl shadow-lg">

                    { /* Title bar with exit button */ }
                    <div className="flex items-center justify-between w-full">
                        <h3 className="text-xl text-blue-600 font-semibold tracking-wide uppercase">
                            { title }
                        </h3>

                        <h3 className="text-xl font-semibold cursor-pointer" onClick={ onClose }>
                            ✕
                        </h3>
                    </div>

                    { children }

                </div>

            </Transition>

        </div>

    )

}
