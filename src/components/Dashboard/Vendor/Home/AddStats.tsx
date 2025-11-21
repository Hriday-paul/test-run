import React from 'react'

function AddStats() {
    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 w-full min-w-0">
                <div className="flex flex-col px-6 py-2 bg-white shadow-2 rounded overflow-hidden border border-stroke">
                    <div className="flex flex-col items-center space-y-2 py-3">
                        <div className="text-3xl md:text-6xl font-semibold tracking-tight leading-none text-primary font-popin">{0}</div>
                        <div className="text-lg font-medium text-primary font-popin">Post Limit</div>
                    </div>
                </div>
                <div className="flex flex-col px-6 py-2 bg-white shadow-2 rounded overflow-hidden border border-stroke">
                    <div className="flex flex-col items-center space-y-2 py-3">
                        <div className="text-3xl md:text-6xl font-semibold tracking-tight leading-none text-primary font-popin">{0}</div>
                        <div className="text-lg font-medium text-primary font-popin">Posted Add</div>
                    </div>
                </div>
                <div className="flex flex-col px-6 py-2 bg-white shadow-2 rounded overflow-hidden border border-stroke">
                    <div className="flex flex-col items-center space-y-2 py-3">
                        <div className="text-3xl md:text-6xl font-semibold tracking-tight leading-none text-primary font-popin">{0}</div>
                        <div className="text-lg font-medium text-primary font-popin">Remain Add</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStats