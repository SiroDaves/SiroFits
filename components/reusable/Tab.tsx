import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";

interface TabProps {
  tabContents: any;
}

export const Tab: FC<TabProps> = ({ tabContents }) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex w-full rounded-lg bg-white px-4 py-2 justify-center items-center mb-4">
        <TabsList className="flex items-center justify-evenly bg-white">
          {tabContents.map((tab: any) => (
            <TabsTrigger
              key={tab.value}
              className="data-[state=active]:bg-gray-300 px-12 py-2.5"
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabContents.map((tab: any) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="bg-white px-4 py-2"
        >
          <tab.Component />
        </TabsContent>
      ))}
    </Tabs>
  );
};
