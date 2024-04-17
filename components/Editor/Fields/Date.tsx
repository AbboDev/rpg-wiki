'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { CustomField } from '@measured/puck';
import { FieldLabel } from '@measured/puck';

const DateField: CustomField<Date | undefined> = {
  type: 'custom',
  render: ({ onChange, value, field }) => (
    <>
      {field.label && <FieldLabel label={field.label} />}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            required
            mode="single"
            selected={value}
            onSelect={(newValue) => onChange(newValue)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  ),
};

export { DateField as Date };
