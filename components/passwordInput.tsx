import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button"
import {UpdateIcon, CopyIcon} from "@radix-ui/react-icons"
import {useCopyToClipboard} from "usehooks-ts";
import {toast} from "sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function PasswordInput({value, form}: any) {
  const [, copy] = useCopyToClipboard();

  function checkSubmitDisable() {
    const {isIncludeNumbers, isIncludeLowercase, isIncludeUppercase, isIncludeSymbols} = form.watch();
    return !(isIncludeNumbers || isIncludeLowercase || isIncludeUppercase || isIncludeSymbols);
  }

  function onCopyClick() {
    const valueToCopy = value || '';
    copy(valueToCopy).then(r => {
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
              <div className="w-full h-full overflow-x-auto text-center p-6">
                <span className="text-lg md:text-4xl font-mono leading-none">{value || 'Loading...'}</span>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent>Click to copy</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        disabled={checkSubmitDisable()}
        className={`w-full ${checkSubmitDisable() ? 'disabled:cursor-not-allowed' : ''}`}
      >
        <UpdateIcon className="mr-2"/> Generate
      </Button>
    </div>
  )
}

export default PasswordInput;