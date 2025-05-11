// import { loadStripe } from "@stripe/stripe-js";

// export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const appearance = {
  theme: 'flat',
  variables: {
    fontLineHeight: '2',
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
      padding: '13px 20px',
      borderRadius: '12px',
      fontSize: '13px',
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
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'row',
      gap: "10px",
      marginBottom: '40px'
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
      paddingBottom: '8px',
    }
  }
};
