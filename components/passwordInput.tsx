import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button"
import {UpdateIcon, ClipboardCopyIcon} from "@radix-ui/react-icons"
import {useCopyToClipboard} from "usehooks-ts";

function PasswordInput({generateDisabled, value, submit}: any) {
  const [, copy] = useCopyToClipboard()

  if (!value) {
    return (
      <Card className="px-4 py-10 w-full flex flex-row justify-center items-center">
        <Button className="h-10" variant="default" onClick={() => submit()}>
          Generate
        </Button>
      </Card>
    )
  }

  return (
    <Card className="px-4 py-10 w-full flex flex-row justify-center items-center relative">
      <span className="text-3xl font-mono h-10">{value}</span>

      <div className="flex flex-col items-end space-y-2 absolute right-4">
        <Button disabled={generateDisabled} variant="outline" size="icon" className="border-0 bg-muted">
          <UpdateIcon className="h-4 w-4"/>
        </Button>
        {/*<Button type="button" variant="outline" size="icon" className="border-0 bg-muted" onClick={() => copy(value)}>*/}
        {/*  <ClipboardCopyIcon className="h-4 w-4"/>*/}
        {/*</Button>*/}
      </div>
    </Card>
  )
}

export default PasswordInput;