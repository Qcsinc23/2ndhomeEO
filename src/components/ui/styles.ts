import { CSSProperties } from 'react';

export const viewStyles = {
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  progressBarContainer: {
    backgroundColor: 'var(--amplify-colors-neutral-20)',
    borderRadius: '9999px',
    overflow: 'hidden'
  },
  progressBarFill: (color: string): CSSProperties => ({
    backgroundColor: color,
    height: '100%',
    borderRadius: '9999px',
    transition: 'width 0.3s ease-in-out'
  }),
  tabContainer: {
    display: 'flex',
    borderBottom: '1px solid var(--amplify-colors-neutral-20)',
    marginBottom: '1rem'
  },
  tabItem: (isActive: boolean): CSSProperties => ({
    padding: '1rem',
    cursor: 'pointer',
    color: isActive ? 'var(--amplify-colors-brand-primary-80)' : 'var(--amplify-colors-neutral-80)',
    borderBottom: '2px solid',
    borderColor: isActive ? 'var(--amplify-colors-brand-primary-80)' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal'
  }),
  notificationItem: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--amplify-colors-neutral-20)',
    cursor: 'pointer'
  }
} as const;
