import { useTranslations } from "next-intl";

type TabsProps = {
  selectedTab: number;
  setSelectedTab: (tab: number) => void;
};

const Tabs = ({ selectedTab, setSelectedTab }: TabsProps) => {
  const t_app = useTranslations("APP");

  return (
    <div className="tabs-boxed tabs mx-auto mb-2">
      <a
        className={`tab ${selectedTab === 0 && "tab-active"}`}
        onClick={() => {
          setSelectedTab(0);
        }}
      >
        {t_app("TITLE")}
      </a>
      <a
        className={`tab ${selectedTab === 1 && "tab-active"}`}
        onClick={() => {
          setSelectedTab(1);
        }}
      >
        {t_app("SETTINGS")}
      </a>
    </div>
  );
};

export default Tabs;
