import React from "react";
import { FormControl } from "@/components/ui/form";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

export const ComboboxField: React.FC<FormlyFieldConfig> = ({ field, name, form, control, props}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl className={cn("ml-2")}>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !field?.value && "text-muted-foreground"
            )}
          >
            {field?.value
              ? props?.options?.find(
                (option) => option.value === field.value
              )?.label
              : props?.placeholder}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            {...(props?.placeholder ? {placeholder: props.placeholder} : {})}
            className="h-9"
          />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
            {props?.options?.map((option) => (
              <CommandItem
                value={option.label}
                key={option.value}
                onSelect={(value) => {
                  form?.setValue(name, option.value)
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    option.value === field?.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
