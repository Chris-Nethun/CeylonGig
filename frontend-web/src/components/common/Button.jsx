export default function Button({ children, variant = 'primary', size, className = '', ...props }) {
  const classes = ['button', variant === 'accent' ? 'button-accent' : '', variant === 'outline' ? 'button-outline' : '', size === 'small' ? 'button-small' : '', className].filter(Boolean).join(' ');
  return <button className={classes} {...props}>{children}</button>;
}
