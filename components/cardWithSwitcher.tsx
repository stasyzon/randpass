import {Card} from "@/components/ui/card";
import {Switch} from "@/components/ui/switch"
import {Label} from "@/components/ui/label"

interface Props {
  label: string;
  checked: boolean;
  description: string;
  onCheckedChange: (checked: boolean) => void;
}

function cardWithSwitcher({label, checked, onCheckedChange, description}: Props) {
  return (
    <Card className="flex flex-row items-center justify-between p-5">
      <div className="flex flex-col space-y-2">
        <Label>{label}</Label>
        <span className="text-sm text-muted-foreground">{description}</span>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </Card>
  )
}

export default cardWithSwitcher;