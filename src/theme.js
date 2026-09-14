import { createTheme } from '@mantine/core'

export const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
  headings: { fontFamily: 'Poppins, sans-serif', fontWeight: '700' },
  primaryColor: 'sbBlue',
  defaultRadius: 'lg',
  colors: {
    sbBlue: ['#EAF4FF', '#CFE6FF', '#9FC9FF', '#6FADFF', '#3F90FF', '#1E6FD9', '#175BB3', '#124E9C', '#0D3C79', '#092A57'],
    sbGold: ['#FFF8E8', '#FFEFC4', '#FFE39C', '#FFD671', '#FFCB4C', '#F6B93B', '#E0A52D', '#C08F1F', '#9E7514', '#7A5A0A'],
  },
  components: {
    Button: { defaultProps: { radius: 'xl' } },
    Card: { defaultProps: { radius: 'lg', shadow: 'sm' } },
  },
})
