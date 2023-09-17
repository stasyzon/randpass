import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button"
import {UpdateIcon, CopyIcon} from "@radix-ui/react-icons"
import {useCopyToClipboard} from "usehooks-ts";
import {useToast} from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function PasswordInput({value, form}: any) {
  const [, copy] = useCopyToClipboard();
  const {toast} = useToast()

  function checkSubmitDisable() {
    const {isIncludeNumbers, isIncludeLowercase, isIncludeUppercase, isIncludeSymbols} = form.watch();
    return !(isIncludeNumbers || isIncludeLowercase || isIncludeUppercase || isIncludeSymbols);
  }

  function onCopyClick() {
    const valueToCopy = value || '';
    copy(valueToCopy).then(r => {
      toast({
        description: "Copied to clipboard ✅"
      })
    });
  }

  return (
    <div className="space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="w-full">
            <Card onClick={onCopyClick} className="p-6 flex flex-col items-center space-y-4 cursor-pointer w-full">
              <div className="flex flex-row">
                <span className="text-4xl font-mono mr-2 h-9">{value || 'Loading...'}</span>
                <CopyIcon className="text-neutral-500"/>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent>Click to copy</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button disabled={checkSubmitDisable()} className="w-full">
        <UpdateIcon className="mr-2"/> Generate
      </Button>
    </div>
  )
}

export default PasswordInput;