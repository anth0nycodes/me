import { DATA } from "@/data/me";
import { ScrambleText } from "@/components/scramble-text";
import { Building2, MapPin } from "lucide-react";
export function Header() {
  const headerInfo = [
    {
      icon: MapPin,
      text: DATA.location,
    },
    {
      icon: Building2,
      text: DATA.occupation,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl font-medium font-minecraft lowercase">
        <span className="inline-block">
          <ScrambleText text={DATA.name} />
        </span>
      </h1>
      {headerInfo.map((item, index) => (
        <div className="flex items-center text-gray-400 gap-2" key={index}>
          <item.icon className="size-4" />
          <p>{item.text}</p>
        </div>
      ))}
      <p>{DATA.summary}</p>
    </div>
  );
}
