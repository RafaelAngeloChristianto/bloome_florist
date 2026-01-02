// Consistent theme configuration for Bloome
export const theme = {
  colors: {
    primary: 'from-pink-500 via-rose-600 to-purple-700',
    primaryHover: 'hover:from-pink-600 hover:via-rose-700 hover:to-purple-800',
    background: 'from-white/80 via-pink-50/60 to-white/80',
    text: 'from-pink-600 via-rose-700 to-purple-800',
    border: 'from-pink-400 via-rose-400 to-purple-500',
    glow: 'from-pink-400 via-rose-400 to-purple-500',
  },
  gradients: {
    primary: 'bg-gradient-to-r from-pink-500 via-rose-600 to-purple-700',
    primaryHover: 'hover:from-pink-600 hover:via-rose-700 hover:to-purple-800',
    background: 'bg-gradient-to-r from-white/80 via-pink-50/60 to-white/80',
    text: 'bg-gradient-to-r from-pink-600 via-rose-700 to-purple-800 bg-clip-text text-transparent',
    border: 'bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500',
    glow: 'bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500',
  },
  shadows: {
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  },
  blur: {
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
  },
  rounded: {
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
  },
  transitions: {
    normal: 'transition-all duration-300',
    slow: 'transition-all duration-700',
  }
}

export const themeClasses = {
  button: {
    primary: `${theme.gradients.primary} ${theme.gradients.primaryHover} text-white ${theme.rounded.lg} font-bold ${theme.transitions.normal} ${theme.shadows.xl} hover:shadow-2xl transform hover:scale-105`,
  },
  card: {
    primary: `bg-white/95 ${theme.blur['2xl']} ${theme.rounded.xl} ${theme.shadows['2xl']} border border-pink-100/50`,
  },
  text: {
    heading: `font-hammersmith font-black ${theme.gradients.text} tracking-wider drop-shadow-sm`,
  },
  container: {
    glass: `${theme.gradients.background} ${theme.blur.xl} ${theme.rounded.lg} ${theme.shadows.xl} border border-pink-100/50`,
  }
}