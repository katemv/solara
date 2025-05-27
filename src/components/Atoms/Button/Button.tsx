import { cn } from '@/utils/tailwind'
import { ReactNode } from 'react'

type ButtonVariant = 'gradient-outlined' | 'default'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
  onClick?: () => void
}

export const Button = ({ children, variant = 'default', className, onClick }: ButtonProps) => {
  const baseStyles = cn(
    'h-10 px-6 rounded-lg font-bold relative whitespace-nowrap',
    'transition-all duration-300 ease-in-out',
    'hover:scale-105'
  )

  const variantStyles = {
    'gradient-outlined': cn(
      'bg-gradient-to-r from-indigo-500 to-fuchsia-500 p-0.5',
      'shadow-[0_0_35px_rgba(99,102,241,0.5)] hover:shadow-[0_0_50px_rgba(217,70,239,0.5)]'
    ),
    default: 'bg-gray-800 hover:bg-gray-700'
  }

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
    >
      <span className={cn(
        'rounded-md px-4 py-2 flex items-center',
        'bg-gray-900 text-white h-full w-full text-base mb-0.5'
      )}>
        {children}
      </span>
    </button>
  )
} 