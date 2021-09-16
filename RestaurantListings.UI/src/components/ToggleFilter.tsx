import React from "react";
import "../components/StyleSheet.css";
export interface ToggleFilterProps {
    label: string;
    isChecked?: boolean;
    onChange: (isChecked: boolean) => void;
}

export function ToggleFilter(props: ToggleFilterProps) {
    const { label, isChecked = false, onChange } = props;

    return (
        <div className="tlist">
            <li>
                <label>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onClick={() => onChange?.(isChecked)}
                    />

                    {label}
                </label>
            </li>
        </div>
    );
}
