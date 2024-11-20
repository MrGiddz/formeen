"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "./ui/form";
import { ControllerRenderProps } from "react-hook-form";

interface DatePickerProps {
  onChange?: (value: Date) => void;
  showPresets?: boolean;
  isForm?: boolean;
  field?: ControllerRenderProps<
    {
      name: string;
      expiry_date: Date;
      send_reminder: boolean;
      description?: string | undefined;
      reminder_date?: string[] | undefined;
      banner?: string | undefined;
    },
    "expiry_date"
  >;
}

export function DatePicker({
  showPresets = false,
  isForm,
  field,
  onChange,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    isForm && field ? field.value : undefined
  );

  const handleChange = (value: Date | undefined) => {
    setDate(value);
    if (value && onChange) {
      onChange(value);
    }
    if (isForm && field) {
      field.onChange(value); // Update the form field
    }
  };

  return (
    <Popover>
      {isForm && field ? (
        <>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-[1000]" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(value) => handleChange(value)}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </>
      ) : (
        <>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-auto flex-col space-y-2 p-2 z-[1000]"
          >
            {showPresets && (
              <Select
                onValueChange={(value) =>
                  handleChange(addDays(new Date(), parseInt(value)))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="0">Today</SelectItem>
                  <SelectItem value="1">Tomorrow</SelectItem>
                  <SelectItem value="3">In 3 days</SelectItem>
                  <SelectItem value="7">In a week</SelectItem>
                </SelectContent>
              </Select>
            )}
            <div className="rounded-md border">
              <Calendar mode="single" selected={date} onSelect={handleChange} />
            </div>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
