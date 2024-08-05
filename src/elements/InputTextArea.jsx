import React from 'react'

export default function InputTextArea({
    label,
    placeholder = "typing here",
    className
}) {
    return (
        <div className="flex flex-col gap-4">
            <label htmlFor={label}>{label}</label>
            <textarea
                className={`border p-3 rounded-md ${className}`}
                id={label}
                placeholder={placeholder}
            />
        </div>
    )
}
