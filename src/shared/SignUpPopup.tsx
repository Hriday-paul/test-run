'use client'
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from 'next/link';

const SignUpPopup = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="!rounded-lg p-5 md:max-w-lg">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                            <div>
                                <div className="flex items-start gap-x-0 md:gap-x-5">
                                    <div className="flex h-9 md:h-10 w-10 items-center justify-center rounded-full bg-yellow-600 text-yellow-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                                    </div>
                                    <div className="space-y-1.5">
                                        <h5 className="text-xl text-zinc-900 font-figtree font-popin">Sign In Required</h5>
                                        <p className='text-zinc-800 text-base font-popin'>You need to <Link className="underline" href="/signin">signin</Link> your vendor account to continue.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-row justify-end mt-8 space-x-2">

                                    <button onClick={() => setOpen(false)} type="button" className="text-neutral-50 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none font-figtree focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border border-primary bg-primary shadow-sm hover:bg-opacity-85 h-9 px-4 py-2 cursor-pointer">Cancel</button>

                                    <Link href={'/auth/login'} type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium font-figtree transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 text-zinc-900 shadow hover:bg-neutral-50/90 h-9 px-4 py-2 bg-neutral-50 border border-stroke">Continue to Signin</Link>

                                </div>

                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};



export default SignUpPopup;