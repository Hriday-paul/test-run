import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function DetailsSkeleton() {
    return (
        <main className="bg-white p-6">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Car Images & Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Car Image */}
                        <div className="rounded-2xl overflow-hidden">
                            <Skeleton className="w-full h-80" />
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="flex gap-3 justify-between">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="w-full h-24 rounded-lg"
                                />
                            ))}
                        </div>

                        {/* Car Title */}
                        <div className="space-y-3">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>

                        {/* Car Features Grid */}
                        <div className="mt-8">
                            <Skeleton className="h-6 w-40 mb-4" />
                            <div className="grid grid-cols-2 gap-6">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Skeleton className="w-6 h-6 rounded-full flex-shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Seller Info */}
                    <div className="space-y-6">
                        {/* Seller Card */}
                        <div className="bg-card rounded-lg p-6 space-y-4">
                            {/* Seller Header with Avatar */}
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-12 h-12 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>

                            {/* Seller Details */}
                            <div className="space-y-3 border-t pt-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex gap-3">
                                        <Skeleton className="w-5 h-5 rounded flex-shrink-0" />
                                        <div className="flex-1 space-y-1">
                                            <Skeleton className="h-3 w-20" />
                                            <Skeleton className="h-3 w-32" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp Button */}
                            <Skeleton className="w-full h-10 rounded-lg" />
                        </div>

                        {/* Post Overview */}
                        <div className="bg-card rounded-lg p-6 space-y-4">
                            <Skeleton className="h-6 w-32 mb-4" />
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex justify-between">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                ))}
                            </div>

                            {/* Share Buttons */}
                            <div className="flex gap-3 pt-3 border-t">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="w-8 h-8 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DetailsSkeleton