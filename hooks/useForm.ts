'use client'

import { useState, useCallback } from 'react'

/**
 * Custom hook for managing form state
 * Simplifies handling form inputs, resets, and submissions
 * 
 * @param initialValues - The initial form values object
 * @returns { values, handleChange, setValue, setValues, reset, isValid }
 * 
 * Example usage:
 *   const { values, handleChange, reset } = useForm({
 *     email: '',
 *     password: ''
 *   })
 *   
 *   // In your JSX:
 *   <input name="email" value={values.email} onChange={handleChange} />
 *   
 *   // To reset form:
 *   reset()
 */
export function useForm<T extends Record<string, unknown>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)

  // Handle input change events (works with input, textarea, select)
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    
    // Handle checkbox inputs specially
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setValues(prev => ({ ...prev, [name]: checked }))
    } else {
      setValues(prev => ({ ...prev, [name]: value }))
    }
  }, [])

  // Set a single field value programmatically
  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }, [])

  // Reset form to initial values
  const reset = useCallback(() => {
    setValues(initialValues)
  }, [initialValues])

  // Check if all required fields have values (simple validation)
  const isValid = useCallback((requiredFields: (keyof T)[]) => {
    return requiredFields.every(field => {
      const value = values[field]
      if (typeof value === 'string') return value.trim() !== ''
      return value !== undefined && value !== null
    })
  }, [values])

  return {
    values,
    handleChange,
    setValue,
    setValues,
    reset,
    isValid
  }
}
