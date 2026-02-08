import React from 'react'

const Card = ({
  children,
  className = '',
  hoverable = false,
  padding = true,
  border = true,
  shadow = true,
  ...props
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300'
  
  const paddingClass = padding ? 'p-6' : ''
  const borderClass = border ? 'border border-gray-200' : ''
  const shadowClass = shadow ? 'shadow-bms' : ''
  const hoverClass = hoverable ? 'hover:shadow-lg hover:-translate-y-1' : ''
  
  const classes = `
    ${baseClasses}
    ${paddingClass}
    ${borderClass}
    ${shadowClass}
    ${hoverClass}
    ${className}
  `.trim()

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`mb-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-xl font-bold text-gray-800 ${className}`} {...props}>
      {children}
    </h3>
  )
}

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-gray-600 ${className}`} {...props}>
      {children}
    </p>
  )
}

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`mt-6 pt-6 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card