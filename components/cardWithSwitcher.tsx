import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MouseEvent } from "react";

interface Props {
  label: string;
  checked: boolean;
  description: string;
  onCheckedChange: (checked: boolean) => void;
}

function cardWithSwitcher({ label, checked, onCheckedChange, description }: Props) {
  const handleClick = (event: MouseEvent) => {
    // Prevent the Switch's onClick from being triggered
    if ((event.target as HTMLElement).tagName !== 'INPUT') {
      onCheckedChange(!checked);
    }
  };

  return (
    <Card className="flex flex-row flex-wrap items-center justify-between p-5 select-none hover:bg-secondary-hover cursor-pointer" onClick={handleClick}>
      <div className="flex flex-col space-y-2">
        <Label className="cursor-pointer">{label}</Label>
        <span className="text-sm text-muted-foreground">{description}</span>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </Card>
  );
}

export default cardWithSwitcher;