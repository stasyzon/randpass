"use client"

import {useRouter} from 'next/navigation';
import {useTranslations, useLocale} from "next-intl";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Languages} from "lucide-react";

function LanguageToggle() {
  const t = useTranslations('LanguageToggle');
  const router = useRouter();
  const currentLocale = useLocale();

  const changeLanguage = (lang: string) => {
    router.push(`/${lang}`);
  }

  /**
   * Reorders locales to place the current locale first.
   */
  const locales = ['en', 'uk', 'es'];
  const orderedLocales = [currentLocale, ...locales.filter(locale => locale !== currentLocale)];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="min-w-10 cursor-pointer">
          <Languages className="h-[1.2rem] w-[1.2rem]"/>
          <span className="sr-only">{t('toggleLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {orderedLocales.map(locale => (
          <DropdownMenuItem key={locale} onClick={() => changeLanguage(locale)}>
            {t(locale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageToggle;