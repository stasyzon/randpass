"use client";

import {useForm} from "react-hook-form";
import {Card} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import * as z from "zod";
import {generatePassword} from "@/lib/generate";

import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import CardWithSlider from "@/components/cardWithSwitcher";
import {zodResolver} from "@hookform/resolvers/zod";
import PasswordInput from "@/components/passwordInput";
import {useEffect, useState} from "react";
import Header from "@/components/header";
import {Button} from "@/components/ui/button";
import {RefreshCcw} from "lucide-react"
import {useTranslations} from 'next-intl';
import PasswordHistory from "@/components/PasswordHistory";

const formSchema = z.object({
  generatedPassword: z.string().optional(),
  passwordLength: z.number(),
  isIncludeSymbols: z.boolean(),
  isIncludeNumbers: z.boolean(),
  isIncludeLowercase: z.boolean(),
  isIncludeUppercase: z.boolean(),
  excludeSimilar: z.boolean(),
});

function InputForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      generatedPassword: "",
      passwordLength: 8,
      isIncludeNumbers: true,
      isIncludeLowercase: true,
      isIncludeUppercase: true,
      excludeSimilar: true,
      isIncludeSymbols: false,
    },
  });

  const [isSpinning, setIsSpinning] = useState(false);
  const [passwordHistory, setPasswordHistory] = useState<any[]>([]);

  function handleClick() {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newPassword = generatePassword({
        length: values.passwordLength,
        numbers: values.isIncludeNumbers,
        lowercase: values.isIncludeLowercase,
        uppercase: values.isIncludeUppercase,
        excludeSimilarCharacters: values.excludeSimilar,
        symbols: values.isIncludeSymbols,
      });
      form.setValue("generatedPassword", newPassword);
      const generateDate = new Date();
      setPasswordHistory((prevHistory) => [{generateDate, password: newPassword}, ...prevHistory]);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    form.handleSubmit(onSubmit)();
  }, []);

  function setPasswordLength(value: number[]) {
    form.setValue("passwordLength", value[0]);
  }

  function checkSubmitDisable() {
    const {isIncludeNumbers, isIncludeLowercase, isIncludeUppercase, isIncludeSymbols} = form.watch();
    return !(isIncludeNumbers || isIncludeLowercase || isIncludeUppercase || isIncludeSymbols);
  }

  const t = useTranslations('InputForm');

  return (
    <div>
      <div className="flex flex-col items-center container max-w-screen-md mx-auto py-8">
        <Header/>
        <Form {...form}>
          <form
            id="passwordForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-8"
          >
            <div className="mb-8">
              <FormField
                control={form.control}
                name="generatedPassword"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        form={form}
                        value={field.value}
                        submit={form.handleSubmit}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="passwordLength"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <Card className="p-5 space-y-5">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="top-p">{t('passwordLength')}</Label>
                            <span className="text-sm text-muted-foreground leading-none">
                              {field.value}
                            </span>
                          </div>
                          <Slider
                            defaultValue={[field.value]}
                            max={24}
                            min={4}
                            step={1}
                            onValueChange={setPasswordLength}
                          />
                        </Card>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isIncludeSymbols"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CardWithSlider
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          label={t('includeSymbols')}
                          description={t('includeSymbolsDescription')}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isIncludeNumbers"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CardWithSlider
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          label={t('includeNumbers')}
                          description={t('includeNumbersDescription')}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isIncludeLowercase"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CardWithSlider
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          label={t('includeLowercase')}
                          description={t('includeLowercaseDescription')}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isIncludeUppercase"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CardWithSlider
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          label={t('includeUppercase')}
                          description={t('includeUppercaseDescription')}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excludeSimilar"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CardWithSlider
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          label={t('excludeSimilar')}
                          description={t('excludeSimilarDescription')}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
        <div className="sticky bottom-0 w-screen bg-background py-8 flex items-center justify-center max-w-screen-md">
          <Button
            form="passwordForm"
            disabled={checkSubmitDisable()}
            className={`button w-full h-12 mx-8 ${checkSubmitDisable() ? 'disabled:cursor-not-allowed' : ''}`}
            onClick={handleClick}
          >
            <RefreshCcw size="16" className={`mr-2 ${isSpinning ? 'spin' : ''}`}/> {t('generateButton')}
          </Button>
        </div>
        <PasswordHistory data={passwordHistory}/>
      </div>
    </div>
  );
}

export default InputForm;
