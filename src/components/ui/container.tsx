import React from 'react'

function Container({ children,className }: { children: React.ReactNode ,className?: string }) {
  return (
    <div className={ `lg:container py-1 flex-1 md:w-ful  ${className || ''}` }>
      {children}
    </div>
  )
}

export default Container
// Compare this snippet from src/app/%28dashboard%29/agents/page.tsx: