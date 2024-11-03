import { View, Text } from '@aws-amplify/ui-react';
import { ReactNode, useState } from 'react';
import { viewStyles } from './styles';

interface TabItemProps {
  title: string;
  children: ReactNode;
}

export const TabItem = ({ children }: TabItemProps) => <>{children}</>;

interface TabsProps {
  children: ReactNode;
}

export const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = Array.isArray(children) ? children : [children];

  return (
    <View>
      <View style={viewStyles.tabContainer}>
        {tabs.map((tab: any, index) => (
          <Text
            key={index}
            style={viewStyles.tabItem(activeTab === index)}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.title}
          </Text>
        ))}
      </View>
      <View>
        {tabs[activeTab]}
      </View>
    </View>
  );
};
