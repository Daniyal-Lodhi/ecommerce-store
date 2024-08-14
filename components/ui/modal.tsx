'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react"
import { Fragment } from "react"
import Iconbutton from "./icon-button"
import { X } from "lucide-react"

interface ModalProps {
    open: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    children
}) => {
    return (
        <Transition show={open} appear as={Fragment} >
            <Dialog as={'div'} onClose={onClose} className='relative z-10' >
                <div className="fixed inset-0 " >
                    <div className="fixed inset-0 overflow-y-auto bg-opacity-50 bg-black ">
                        <div className="flex   justify-center items-center  p-4 min-h-full" >
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-100"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className=" bg-white w-full  max-w-3xl rounded-xl" >
                                    <div className="flex relative p-4 sm:p-6 lg:p-8 overflow-hidden " >
                                        <div className="absolute right-4 top-4" >
                                            <Iconbutton
                                                onclick={onClose}
                                                icon={<X size='18' />}
                                            />
                                        </div>
                                        {children}
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>

                    </div>
                </div>

            </Dialog>
        </Transition>
    )
}

export default Modal