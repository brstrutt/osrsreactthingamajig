import { Dispatch, JSX, ReactNode, SetStateAction, useState } from 'react';

export type TabDefinition<Tab> = {
  id: Tab;
  name: string;
  content: ReactNode;
};

export type Tabs = {
  tabButtons: ReactNode[];
  tabContents: ReactNode[];
};

export function useTabs<Tab extends string>(tabs: TabDefinition<Tab>[]): Tabs {
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0].id);

  return {
    tabButtons: tabs.map((tab) => (
      <TabButton
        key={tab.id}
        tab={tab.id}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      >
        {tab.name}
      </TabButton>
    )),
    tabContents: tabs.map((tab) => (
      <div key={tab.id}>{currentTab === tab.id && tab.content}</div>
    )),
  };
}

function TabButton<Tab extends string>(props: {
  tab: Tab;
  children: ReactNode;
  currentTab: Tab;
  setCurrentTab: Dispatch<SetStateAction<Tab>>;
}): JSX.Element {
  const { tab, children, currentTab, setCurrentTab } = props;
  return (
    <button
      onClick={() => setCurrentTab(tab)}
      disabled={currentTab === tab}
      className="tab"
    >
      {children}
    </button>
  );
}
