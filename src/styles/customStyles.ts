// Custom color palette
export const colors = {
  brand: {
    primary: {
      10: '#f0f9ff',
      20: '#e0f2fe',
      40: '#38bdf8',
      60: '#0284c7',
      80: '#075985',
      90: '#0c4a6e',
      100: '#082f49'
    },
    secondary: {
      10: '#f9fafb',
      20: '#f3f4f6',
      40: '#9ca3af',
      60: '#4b5563',
      80: '#1f2937',
      90: '#111827',
      100: '#030712'
    }
  },
  status: {
    success: {
      bg: '#dcfce7',
      text: '#166534'
    },
    warning: {
      bg: '#fef9c3',
      text: '#854d0e'
    },
    error: {
      bg: '#fee2e2',
      text: '#991b1b'
    },
    info: {
      bg: '#dbeafe',
      text: '#1e40af'
    }
  }
};

// Layout styles
export const flexStyles = {
  headerContainer: {
    display: 'flex',
    flexdirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    gap: '1rem'
  },
  contentContainer: {
    display: 'flex',
    flexdirection: 'row' as const,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '1rem',
    gap: '1rem'
  },
  centerContainer: {
    display: 'flex',
    flexdirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  },
  columnContainer: {
    display: 'flex',
    flexdirection: 'column' as const,
    gap: '1rem'
  }
};

// Component-specific styles
export const componentStyles = {
  button: {
    secondary: {
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: colors.brand.primary[60],
      color: colors.brand.primary[60],
      borderRadius: '0.375rem',
      ':hover': {
        backgroundColor: colors.brand.primary[10]
      },
      ':active': {
        backgroundColor: colors.brand.primary[20]
      },
      ':disabled': {
        borderColor: colors.brand.primary[20],
        color: colors.brand.secondary[40]
      }
    }
  },
  badge: {
    success: {
      backgroundColor: colors.status.success.bg,
      color: colors.status.success.text
    },
    warning: {
      backgroundColor: colors.status.warning.bg,
      color: colors.status.warning.text
    },
    error: {
      backgroundColor: colors.status.error.bg,
      color: colors.status.error.text
    },
    info: {
      backgroundColor: colors.status.info.bg,
      color: colors.status.info.text
    }
  },
  heading: {
    h1: { fontSize: '2rem' },
    h2: { fontSize: '1.5rem' },
    h3: { fontSize: '1.25rem' },
    h4: { fontSize: '1.125rem' }
  }
};
