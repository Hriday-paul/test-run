"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  type Control,
  Controller,
  type FieldErrors,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form"

interface SelectWithSearchProps<T extends FieldValues> {
  name: Path<T>
  placeholder?: string
  control: Control<T>
  errors: FieldErrors<T>
  validationRules: RegisterOptions<T, Path<T>>
  defaultSelected?: { value: string; label: string }
  items: { value: string | number; label: string, id ?: string | number }[]
  isLoading?: boolean,
  setState ?: React.Dispatch<React.SetStateAction<any>>,
  disabled ?: boolean
}

export function SelectWithSearch<T extends FieldValues>({
  defaultSelected,
  items,
  control,
  isLoading = false,
  name,
  errors,
  setState = (e)=>{},
  placeholder = "Select Service...",
  validationRules,
  disabled = false
}: SelectWithSearchProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        rules={validationRules}
        defaultValue={defaultSelected?.value as T[Path<T>]}
        render={({ field }) => {
          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  disabled={disabled}
                  className={`w-full justify-between bg-white rounded shadow-none text-sm font-popin py-[22px] font-normal cursor-pointer ${
                    errors?.[name]?.message ? "border-red-500" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="loader"></span>
                  ) : field.value ? (
                    
                    items.find((item) => item.value.toString() === field.value)?.label
                  ) : (
                    placeholder
                  )}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 font-popin">
                <Command>
                  <CommandInput placeholder="Search..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No list found.</CommandEmpty>
                    <CommandGroup>
                      {items.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.label.toString()}
                          className="hover:bg-slate-100 cursor-pointer"
                          onSelect={(currentLabel) => {
                            const currentValue = items?.find(i=>i?.label == currentLabel)?.value.toString();
                            const newValue = currentValue === field.value ? "" : currentValue;
                            field.onChange(newValue)
                            setState(item)
                            setOpen(false)
                          }}
                        >
                          {item.label}
                          <Check className={cn("ml-auto", field.value === item.value.toString() ? "opacity-100" : "opacity-0")} />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )
        }}
      />
    </div>
  )
}
