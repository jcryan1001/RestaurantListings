import React from "react";

export interface ToggleFilterProps {
  label: string;
  isChecked?: boolean;
  onChange: (isChecked: boolean) => void;
}

export function ToggleFilter(props: ToggleFilterProps) {
  const { label, isChecked = false, onChange } = props;

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onChange?.(!isChecked)}
        />

        {label}
      </label>
    </div>
  );
}
