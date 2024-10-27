import ModeToggle from "@/components/themeToggle";
import LanguageToggle from "@/components/languageToggle";
import {useTranslations} from 'next-intl';

function Header() {
  const t = useTranslations('Header');

  return (
    <div className="w-full flex flex-row justify-center items-center">
      <div className="w-full flex flex-col items-start flex-wrap">
        <h4 className="text-xl font-semibold tracking-tight">
          {t('title')}
        </h4>
        <p className="text-sm text-muted-foreground">{t('description')}</p>
      </div>
      <div className="flex flex-row space-x-4">
        <LanguageToggle/>
        <ModeToggle/>
      </div>
    </div>
  )
}

export default Header;