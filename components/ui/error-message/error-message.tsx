import React from 'react'

export interface ErrorMessageProps {
  message?: string | null
  className?: string
}

/**
 * Displays an error message in red text. Renders nothing if message is null/undefined.
 */
export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  if (!message) return null

  return <span className={`text-sm text-destructive ${className}`.trim()}>{message}</span>
}
