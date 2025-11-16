"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  totalPages: number
  initialPage?: number
  onPageChange?: (page: number) => void
  maxDisplayedPages?: number
}

export default function Pagination({
  totalPages,
  initialPage = 1,
  onPageChange,
  maxDisplayedPages = 5,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    onPageChange?.(page)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []

    // Calculate the range of page numbers to display
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2))
    const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1)

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1)
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="h-9 w-9 rounded-md flex items-center justify-center text-sm"
        >
          1
        </button>,
      )
      if (startPage > 2) {
        pageNumbers.push(
          <span key="start-ellipsis" className="h-9 w-9 flex items-center justify-center">
            ...
          </span>,
        )
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={cn(
            "h-9 w-9 rounded-md flex items-center justify-center text-sm transition-colors",
            currentPage === i ? "bg-primary text-white" : "hover:bg-gray-200",
          )}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i}
        </button>,
      )
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="end-ellipsis" className="h-9 w-9 flex items-center justify-center">
            ...
          </span>,
        )
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="h-9 w-9 rounded-md flex items-center justify-center text-sm"
        >
          {totalPages}
        </button>,
      )
    }

    return pageNumbers
  }

  return (
    <nav className="flex items-center justify-end space-x-1 font-figtree" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "h-9 w-9 rounded-md flex items-center justify-center",
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200",
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex items-center">{renderPageNumbers()}</div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "h-9 w-9 rounded-md flex items-center justify-center",
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200",
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}

