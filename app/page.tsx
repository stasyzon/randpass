"use client"

import {useForm} from "react-hook-form"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Slider} from "@/components/ui/slider"
import * as z from "zod"
import {generatePassword} from "@/lib/generate"
import Image from 'next/image'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import CardWithSlider from "@/components/cardWithSwitcher";
import {zodResolver} from "@hookform/resolvers/zod";
import PasswordInput from "@/components/passwordInput";
import {useCopyToClipboard} from "usehooks-ts";
import {Separator} from "@/components/ui/separator"

const formSchema = z.object({
  generatedPassword: z.string().optional(),
  passwordLength: z.number(),
  isIncludeSymbols: z.boolean(),
  isIncludeNumbers: z.boolean(),
  isIncludeLowercase: z.boolean(),
  isIncludeUppercase: z.boolean(),
  excludeSimilar: z.boolean(),
})

function InputForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      generatedPassword: '',
      passwordLength: 8,
      isIncludeNumbers: true,
      isIncludeLowercase: true,
      isIncludeUppercase: true,
      excludeSimilar: true,
      isIncludeSymbols: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      form.setValue("generatedPassword", generatePassword({
        length: values.passwordLength,
        numbers: values.isIncludeNumbers,
        lowercase: values.isIncludeLowercase,
        uppercase: values.isIncludeUppercase,
        excludeSimilarCharacters: values.excludeSimilar,
        symbols: values.isIncludeSymbols,
      }))
    } catch (error: any) {
      console.log(error.message)
    }
  }

  function setPasswordLength(value: number[]) {
    form.setValue("passwordLength", value[0]);
  }

  function checkSubmitDisable() {
    const {isIncludeNumbers, isIncludeLowercase, isIncludeUppercase, isIncludeSymbols} = form.watch();
    return !(isIncludeNumbers || isIncludeLowercase || isIncludeUppercase || isIncludeSymbols);
  }

  return (
    <div className="flex flex-col items-center container max-w-screen-md mx-auto h-screen py-6 space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="generatedPassword"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    generateDisabled={checkSubmitDisable()}
                    value={field.value}
                    submit={form.handleSubmit}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordLength"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Card className="p-5 space-y-5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="top-p">Password length</Label>
                      <span
                        className="text-sm text-muted-foreground leading-none">
                          {field.value}
                        </span>
                    </div>
                    <Slider defaultValue={[field.value]} max={24} min={4} step={1} onValueChange={setPasswordLength}/>
                  </Card>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-row w-full space-x-4">
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
                      description="e.g. !@#$%^&*()+_\-=}{[\]|:;/?.><,`~]"
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
          </div>
          <div className="flex flex-row w-full space-x-4">
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
          </div>
          <div className="flex flex-row w-full space-x-4">
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
            {/*<Card className="w-full flex justify-center items-center">*/}
            {/*  <span className="text-2xl font-medium">Donate</span>*/}
            {/*</Card>*/}
          </div>
        </form>
      </Form>
      <Image
        src="/support.png"
        width={468}
        height={60}
        alt="Picture of the author"
      />
      <Card className="w-full p-5 space-y-5">
        <div className="space-y-4">
          <h4 className="font-semibold tracking-tight text-md">RandPass: Next-Gen Password Protection</h4>
          <p className="text-sm">Welcome to RandPass, where modern technology meets everyday security needs. In an online world that's
            always evolving, so are the threats. That's where we come in. With just a few taps, RandPass crafts
            passwords that aren’t just tough—they're virtually unbeatable. Whether you're keeping your financial data
            secure, guarding your emails, or just locking down your social media, RandPass is the modern choice for a
            digital-first world.</p>
        </div>
        <Separator/>
        <div className="space-y-4">
          <h4 className="font-semibold tracking-tight text-md">Beyond Just Passwords: The RandPass Difference</h4>
          <p className="text-sm">You've used password generators, but not like this. RandPass isn't just about creating a string of
            characters; it's about giving you the reins. Want longer, trickier, or a specific set of characters? No
            problem. Our state-of-the-art tech doesn't just follow standards; it sets them. And with our commitment to
            generating passwords that stand strong against both brute-force and dictionary attacks, you're always one
            step ahead. Dive into the future of security with RandPass.</p>
        </div>
      </Card>
    </div>
  )
}

export default InputForm;