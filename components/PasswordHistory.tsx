import {useState, FC} from 'react';
import {Card} from "@/components/ui/card";
import {useTranslations} from 'next-intl';
import {useCopyToClipboard} from '@/hooks/useCopyToClipboard';
import {Check, Copy} from "lucide-react";
import {Button} from '@/components/ui/button';
import {Skeleton} from "@/components/ui/skeleton"

type PasswordEntry = {
  generateDate: Date;
  password: string;
};

interface PasswordHistoryProps {
  data: PasswordEntry[];
}

function PasswordButton({passwordData}: { passwordData: PasswordEntry }) {
  const [isCopied, setIsCopied] = useState(false);
  const [, copy] = useCopyToClipboard();

  const handleCopy = () => {
    copy(passwordData.password).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    });
  };

  const t = useTranslations('PasswordHistory');

  return (
    <Button
      variant="ghost"
      onClick={handleCopy}
      className="flex justify-start items-center w-full group relative"
    >
    <span className="text-xs sm:text-sm text-gray-500 mr-2 sm:mr-6">
      {passwordData.generateDate.toLocaleString()}
    </span>
      <span className="text-xs sm:text-base">{passwordData.password}</span>

      <div
        className="flex items-center space-x-1 text-green-500 text-xs transition-opacity duration-300 ease-out absolute right-2"
        style={{opacity: isCopied ? 1 : 0}}
      >
        <span>{t('copied')}</span>
        <Check size="16"/>
      </div>
      <Copy
        size="16"
        className={`text-neutral-500 absolute right-2 group-hover:animate-pulse ${isCopied ? 'hidden' : 'block'}`}
      />
    </Button>
  );
}

const PasswordHistory: FC<PasswordHistoryProps> = ({data}) => {
  return (
    <Card className="w-full p-4">
      <div className="space-y-2 font-mono">
        {data.length === 0 && (
          <div className="p-2 flex flex-row justify-between items-center">
            <div className="flex flex-row">
              <Skeleton className="mr-6 w-[200px] h-[24px] rounded-full"/>
              <Skeleton className="w-[100px] h-[24px] rounded-full"/>
            </div>
            <Skeleton className="w-[20px] h-[20px]"/>
          </div>
        )}
        {data.map((passwordData, index) => (
          <PasswordButton key={index} passwordData={passwordData}/>
        ))}
      </div>
    </Card>
  );
};

export default PasswordHistory;