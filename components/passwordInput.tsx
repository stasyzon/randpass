import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button"
import {UpdateIcon, ClipboardCopyIcon} from "@radix-ui/react-icons"
import {useCopyToClipboard} from "usehooks-ts";

function PasswordInput({generateDisabled, value, submit}: any) {
  const [, copy] = useCopyToClipboard()

  return (
    <Card className="p-4 w-full flex flex-row justify-between items-center">
      <div></div>
      <span className="text-3xl font-mono">{value || 'Will be here...'}</span>

      <div className="flex flex-col items-end space-y-2">
        <Button disabled={generateDisabled} variant="outline" size="icon" className="border-0 bg-muted">
          <UpdateIcon className="h-4 w-4"/>
        </Button>
        <Button type="button" variant="outline" size="icon" className="border-0 bg-muted" onClick={() => copy(value)}>
          <ClipboardCopyIcon className="h-4 w-4"/>
        </Button>
      </div>
    </Card>
  )
}

export default PasswordInput;