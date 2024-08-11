export const appearance = {
  theme: 'flat',
  variables: {
    // fontFamily: `'Onest', 'sans-serif'`,
    fontLineHeight: '2',
    // padding: "0px, 0px, 32px, 0px",
    accessibleColorOnColorPrimary: '#222222',
    outline: 'none',
  },
  rules: {
    '.Block': {
      backgroundColor: '#F6F8FA',
      boxShadow: 'none',
      padding: '12px',
    },
    '.Input': {
      border: '1px solid #D3D3D3',
      borderOpacity: "40%",
      padding: '16px 20px',
      borderRadius: '10px',
      fontSize: '16px',
      backgroundColor: 'white',
      outline: "none",
      boxSizing: 'border-box',
    },
    '.Input:focus': {
      outline: 'none',
      boxShadow: 'none',
      border: '1px solid #7B6944',
    },
    '.Input:disabled, .Input--invalid:disabled': {
      color: 'lightgray'
    },
    '.Tab': {
      padding: '12px',
      border: '1px solid #F9F9F9',
      backgroundColor: '#F9F9F9',
      color: '#222222',
      borderRadius: '10px',

      display: 'flex',
      flexDirection: 'row',
      gap: "10px"
    },
    '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
      border: '1px solid #7B6944',
      backgroundColor: '#F5F5EF',
      outline: 'none',
      boxShadow: 'none'
    },
    '.Label': {
      fontWeight: '400',
      fontSize: '14px',
      paddingBottom: '8px'
    }
  }
};
