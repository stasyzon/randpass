import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button"
import {UpdateIcon, ClipboardCopyIcon} from "@radix-ui/react-icons"
import {useCopyToClipboard} from "usehooks-ts";
import {useToast} from "@/components/ui/use-toast";

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
    <div className="space-y-4">
      <Card className="px-4 py-10 w-full flex flex-row justify-center items-center relative">
        {!value && (
          <span className="text-3xl font-mono h-9 leading-normal text-neutral-500">Loading...</span>
        )}
        <span className="text-3xl font-mono h-9 leading-normal">{value}</span>
      </Card>
      <div className="grid sm:grid-cols-2 gap-4">
        <Button
          onClick={onCopyClick}
          type="button"
          className="w-full"
          variant="secondary"
        >
          <ClipboardCopyIcon className="mr-2"/> Copy
        </Button>
        <Button disabled={checkSubmitDisable()} variant="secondary" className="w-full">
          <UpdateIcon className="mr-2"/> Generate
        </Button>
      </div>
    </div>
  )
}

export default PasswordInput;