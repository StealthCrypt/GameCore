'use client'

import { useState, useCallback } from 'react'

/**
 * Custom hook for managing success/error messages
 * Automatically clears messages after a delay
 * 
 * @param autoClearDelay - Time in ms before message auto-clears (default: 3000ms, 0 to disable)
 * @returns { message, isSuccess, showMessage, showError, showSuccess, clearMessage }
 * 
 * Example usage:
 *   const { message, isSuccess, showSuccess, showError } = useMessage()
 *   
 *   // In your async function:
 *   try {
 *     await someAPI.call()
 *     showSuccess('It worked!')
 *   } catch (err) {
 *     showError(err)
 *   }
 */
export function useMessage(autoClearDelay: number = 3000) {
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  // Clear the message
  const clearMessage = useCallback(() => {
    setMessage('')
  }, [])

  // Show a success message
  const showSuccess = useCallback((msg: string) => {
    setMessage(msg)
    setIsSuccess(true)
    if (autoClearDelay > 0) {
      setTimeout(clearMessage, autoClearDelay)
    }
  }, [autoClearDelay, clearMessage])

  // Show an error message (accepts string or Error object)
  const showError = useCallback((error: string | Error) => {
    const msg = error instanceof Error ? error.message : error
    setMessage(msg)
    setIsSuccess(false)
    if (autoClearDelay > 0) {
      setTimeout(clearMessage, autoClearDelay)
    }
  }, [autoClearDelay, clearMessage])

  // Generic show message (auto-detects success based on content)
  const showMessage = useCallback((msg: string) => {
    setMessage(msg)
    setIsSuccess(msg.toLowerCase().includes('success'))
    if (autoClearDelay > 0) {
      setTimeout(clearMessage, autoClearDelay)
    }
  }, [autoClearDelay, clearMessage])

  return {
    message,
    isSuccess,
    showMessage,
    showError,
    showSuccess,
    clearMessage
  }
}
