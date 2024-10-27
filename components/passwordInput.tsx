import {useState} from 'react';
import {Card} from "@/components/ui/card";
import {Copy, Check} from "lucide-react";
import {useCopyToClipboard} from "usehooks-ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function PasswordInput({value}: any) {
  const [isCopied, setIsCopied] = useState(false);
  const [, copy] = useCopyToClipboard();

  function onCopyClick() {
    const valueToCopy = value || '';
    copy(valueToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  }

  return (
    <div className="space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="w-full">
            <Card
              onClick={onCopyClick}
              className={`cursor-pointer w-full relative group`}
            >
              <div
                className="flex items-center space-x-1 absolute top-2 right-2 text-green-500 text-xs transition-opacity duration-300 ease-out"
                style={{opacity: isCopied ? 1 : 0}}
              >
                <span>Copied!</span>
                <Check size="16"/>
              </div>
              <Copy
                size="16"
                className={`text-neutral-500 absolute top-2 right-2 group-hover:animate-pulse ${isCopied ? 'hidden' : 'block'}`}
              />
              <div className="w-full overflow-x-auto text-center p-6">
                <span className="text-4xl font-mono break-all">{value || 'Loading...'}</span>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent>Click to copy</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default PasswordInput;