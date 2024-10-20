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
import {useEffect} from "react";
import {Toaster} from "@/components/ui/sonner"
import Header from "@/components/header";
import {Button} from "@/components/ui/button";
import {UpdateIcon} from "@radix-ui/react-icons";

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      form.setValue(
        "generatedPassword",
        generatePassword({
          length: values.passwordLength,
          numbers: values.isIncludeNumbers,
          lowercase: values.isIncludeLowercase,
          uppercase: values.isIncludeUppercase,
          excludeSimilarCharacters: values.excludeSimilar,
          symbols: values.isIncludeSymbols,
        })
      );
    } catch (error: any) {
      console.log(error.message);
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

  return (
    <div>
      <div className="flex flex-col items-center container max-w-screen-md mx-auto py-8 space-y-8">
        <Header/>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
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
                            <Label htmlFor="top-p">Password length</Label>
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
                          label="Include symbols"
                          description="e.g. !@#$%..."
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
                          label="Include numbers"
                          description="e.g. 123456"
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
                          label="Include lowercase"
                          description="e.g. abcdefgh"
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
                          label="Include uppercase"
                          description="e.g. ABCDEFGH"
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
                          label="Exclude similar characters"
                          description="e.g. i, l, 1, L, o, 0, O"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              disabled={checkSubmitDisable()}
              className={`w-full ${checkSubmitDisable() ? 'disabled:cursor-not-allowed' : ''}`}
            >
              <UpdateIcon className="mr-2"/> Generate
            </Button>
          </form>
        </Form>
        <Toaster/>
      </div>
    </div>
  );
}

export default InputForm;
