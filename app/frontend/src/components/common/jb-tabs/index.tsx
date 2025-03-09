import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define Props Type
interface JBTabsProps {
  tabs: { name: string; content: React.ReactNode }[];
}

const JBTabs: React.FC<JBTabsProps> = ({ tabs }) => {
  if (tabs.length === 0) return null;

  return (
    <Tabs defaultValue={tabs[0].name} className="w-full bg-background">
      <TabsList className="w-auto h-auto flex justify-center items-center">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.name} value={tab.name}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.name} value={tab.name}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default JBTabs;
