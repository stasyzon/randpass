import {useState} from 'react';
import {Card} from "@/components/ui/card";
import {Copy, Check} from "lucide-react";
import {useCopyToClipboard} from "@/hooks/useCopyToClipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {useTranslations} from "next-intl";

function PasswordInput({value}: any) {
  const [isCopied, setIsCopied] = useState(false);
  const [, copy] = useCopyToClipboard();

  function onCopyClick() {
    const valueToCopy = value || '';
    copy(valueToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      onCopyClick();
    }
  }

  const t = useTranslations('PasswordInput');

  return (
    <div className="space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="w-full">
            <Card
              onClick={onCopyClick}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button" // Indicate that the Card behaves like a button
              aria-label={t('clickToCopy')} // Provide a descriptive label
              className={`cursor-pointer w-full relative group border-dashed border-2`}
            >
              <div
                className="flex items-center space-x-1 absolute top-2 right-2 text-green-500 font-mono text-xs transition-opacity duration-300 ease-out"
                style={{opacity: isCopied ? 1 : 0}}
              >
                <span>{t('copied')}</span>
                <Check size="16"/>
              </div>
              <Copy
                size="16"
                className={`text-neutral-500 absolute top-2 right-2 group-hover:animate-pulse ${isCopied ? 'hidden' : 'block'}`}
              />
              <div className="w-full overflow-x-auto text-center p-6">
              <span className="text-4xl font-mono break-all">
                {(value || 'Loading...').split('').map((char: string, idx: number) => {
                  let className = "";
                  if (/[0-9]/.test(char)) {
                    className = "text-yellow-600/70";      // Numbers: soft yellow
                  } else if (/[A-Z]/.test(char)) {
                    className = "text-red-600/70";         // Uppercase: soft red
                  } else if (/[a-z]/.test(char)) {
                    className = "text-blue-600/60";        // Lowercase: muted blue
                  } else if (/\s/.test(char)) {
                    className = "text-muted-foreground";   // Whitespace or muted
                  } else {
                    className = "text-green-600/70";       // Special symbols: soft green
                  }
                  return (
                      <span key={idx} className={className}>
                      {char}
                    </span>
                  );
                })}
              </span>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent>{t('clickToCopy')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default PasswordInput;