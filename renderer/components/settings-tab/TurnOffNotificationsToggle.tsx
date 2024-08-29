import { turnOffNotificationsAtom } from "@/atoms/userSettingsAtom";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

const TurnOffNotificationsToggle = () => {
  const [turnOffNotifications, setTurnOffNotifications] = useAtom(
    turnOffNotificationsAtom,
  );
  const t_infos = useTranslations("APP.INFOS.TURN_OFF_NOTIFICATIONS");

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{t_infos("TITLE")}</p>
      <p className="text-xs text-base-content/80">{t_infos("DESC")}</p>
      <input
        type="checkbox"
        className="toggle"
        checked={turnOffNotifications}
        onClick={() => {
          setTurnOffNotifications(!turnOffNotifications);
        }}
      />
    </div>
  );
};

export default TurnOffNotificationsToggle;
