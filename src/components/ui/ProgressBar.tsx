import { View, Text } from '@aws-amplify/ui-react';
import { viewStyles } from './styles';

interface ProgressBarProps {
  value: number;
  maxValue: number;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variation?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

export const ProgressBar = ({
  value,
  maxValue,
  label,
  size = 'medium',
  variation = 'info',
  className
}: ProgressBarProps) => {
  const percentage = (value / maxValue) * 100;
  
  const getHeight = () => {
    switch (size) {
      case 'small':
        return '0.5rem';
      case 'large':
        return '1rem';
      default:
        return '0.75rem';
    }
  };

  const getColor = () => {
    switch (variation) {
      case 'success':
        return 'var(--amplify-colors-green-60)';
      case 'warning':
        return 'var(--amplify-colors-yellow-60)';
      case 'error':
        return 'var(--amplify-colors-red-60)';
      default:
        return 'var(--amplify-colors-blue-60)';
    }
  };

  return (
    <View className={className}>
      {label && (
        <Text
          fontSize={size === 'small' ? 'small' : 'medium'}
          color="neutral.80"
          marginBottom="xxs"
        >
          {label}
        </Text>
      )}
      <View
        style={{
          ...viewStyles.progressBarContainer,
          height: getHeight()
        }}
      >
        <View
          style={{
            ...viewStyles.progressBarFill(getColor()),
            width: `${percentage}%`
          }}
        />
      </View>
    </View>
  );
};
