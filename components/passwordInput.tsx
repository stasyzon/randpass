import {Card} from "@/components/ui/card";
import {CopyIcon} from "@radix-ui/react-icons"
import {useCopyToClipboard} from "usehooks-ts";
import {toast} from "sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function PasswordInput({value}: any) {
  const [, copy] = useCopyToClipboard();

  function onCopyClick() {
    const valueToCopy = value || '';
    copy(valueToCopy).then(() => {
      toast("Copied to clipboard ✅")
    });
  }

  return (
    <div className="space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="w-full">
            <Card onClick={onCopyClick} className="cursor-pointer w-full relative">
              <CopyIcon className="text-neutral-500 absolute top-2 right-2"/>
              <div className="w-full overflow-x-auto text-center p-6">
                <span className="text-4xl font-mono break-all">{value || 'Loading...'}</span>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent>Click to copy</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default PasswordInput;