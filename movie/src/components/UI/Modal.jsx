import React, { useEffect } from 'react'
import { X } from 'lucide-react'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  preventClose = false,
  className = ''
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !preventClose) {
        onClose?.()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, preventClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-screen-xl'
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !preventClose) {
      onClose?.()
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`
            relative w-full transform overflow-hidden rounded-2xl bg-white shadow-2xl
            transition-all duration-300 ease-out
            ${sizeClasses[size]}
            ${className}
          `}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              {title && (
                <h3 className="text-xl font-bold text-gray-800">
                  {title}
                </h3>
              )}
              
              {showCloseButton && (
                <button
                  onClick={onClose}
                  disabled={preventClose}
                  className={`
                    ml-auto p-2 text-gray-400 hover:text-gray-600 transition-colors
                    ${preventClose ? 'cursor-not-allowed opacity-50' : ''}
                  `}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export const ModalHeader = ({ children, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  )
}

export const ModalTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`text-2xl font-bold text-gray-800 ${className}`}>
      {children}
    </h3>
  )
}

export const ModalDescription = ({ children, className = '' }) => {
  return (
    <p className={`text-gray-600 mt-2 ${className}`}>
      {children}
    </p>
  )
}

export const ModalContent = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export const ModalFooter = ({ children, className = '' }) => {
  return (
    <div className={`mt-8 flex justify-end space-x-3 ${className}`}>
      {children}
    </div>
  )
}

export default Modal