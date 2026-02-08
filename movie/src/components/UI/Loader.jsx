import React from 'react'

export const Loader = ({ size = 'md', color = 'bms-red', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4'
  }
  
  const colorClasses = {
    'bms-red': 'border-bms-red border-t-transparent',
    'white': 'border-white border-t-transparent',
    'gray': 'border-gray-400 border-t-transparent',
    'blue': 'border-blue-500 border-t-transparent',
    'green': 'border-green-500 border-t-transparent'
  }
  
  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} ${className}`}></div>
  )
}

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-bms-red mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export const Skeleton = ({ className = '', variant = 'rect' }) => {
  const variantClasses = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded'
  }
  
  return (
    <div className={`bg-gray-200 animate-shimmer ${variantClasses[variant]} ${className}`}></div>
  )
}

export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <Skeleton className="h-6 w-2/3 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-6" />
      <div className="flex space-x-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card">
      <Skeleton className="h-64 rounded-t-xl" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export default Loader