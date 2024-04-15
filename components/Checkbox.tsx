'use client';

import { ComponentProps, useState } from 'react';

interface Props extends ComponentProps<'input'> {
  label?: string;
  checkedLabel?: string;
}

export function Checkbox({
  id,
  label,
  checkedLabel,
  checked,
  ...otherProps
}: Props) {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div className="inline-flex gap-1 justify-start items-baseline select-none">
      <input
        id={id}
        {...otherProps}
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
      />
      <label className="block" htmlFor={id}>
        {label && (
          <span>{checkedLabel && isChecked ? checkedLabel : label}</span>
        )}
      </label>
    </div>
  );
}
