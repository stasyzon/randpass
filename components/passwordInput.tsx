import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button"
import {UpdateIcon, ClipboardCopyIcon} from "@radix-ui/react-icons"
import {useCopyToClipboard} from "usehooks-ts";

function PasswordInput({generateDisabled, value, submit}: any) {

  return (
    <Card className="px-4 py-10 w-full flex flex-row justify-center items-center relative">
      {!value && (
        <span className="text-3xl font-mono h-9 leading-normal text-neutral-500">Click &quot;Generate&quot;</span>
      )}
      <span className="text-3xl font-mono h-9 leading-normal">{value}</span>
    </Card>
  )
}

export default PasswordInput;