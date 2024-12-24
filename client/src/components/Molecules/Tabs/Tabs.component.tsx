import { FC, ReactElement, useState } from "react";

import Flex from "../../Atoms/Flex/Flex.component";
import Tab from "./Tab.component";

interface TabConfig {
    label: string;
    content: ReactElement;
}

interface TabsProps {
    tabs: TabConfig[];
    activeTab?: number;
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Flex direction="column">
            <Flex gap="spacing3" marginBottom="spacing4" wrap data-full-width>
                {tabs.map((tab, index) => (
                    <Tab
                        key={tab.label}
                        isActive={activeIndex === index}
                        label={tab.label}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </Flex>
            {tabs[activeIndex]?.content}
        </Flex>
    );
};

export default Tabs;
