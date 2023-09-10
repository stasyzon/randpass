"use client"

import {useForm} from "react-hook-form"
import {Card} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Slider} from "@/components/ui/slider"
import { UpdateIcon } from "@radix-ui/react-icons"
import * as z from "zod"
import {generatePassword} from "@/lib/generate"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import CardWithSlider from "@/components/cardWithSlider";
import {zodResolver} from "@hookform/resolvers/zod";

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
    const test = generatePassword({
      length: values.passwordLength,
      numbers: values.isIncludeNumbers,
      lowercase: values.isIncludeLowercase,
      uppercase: values.isIncludeUppercase,
      excludeSimilarCharacters: values.excludeSimilar,
      symbols: values.isIncludeSymbols,
    })
    form.setValue("generatedPassword", test)
  }

  function setPasswordLength(value: number[]) {
    form.setValue("passwordLength", value[0]);
  }

  return (
    <div className="container max-w-screen-sm mx-auto py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="generatedPassword"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row space-x-4">
                    <Input className="h-12" placeholder="Generated password" {...field} />
                    <Button className="w-5/12 h-12"><UpdateIcon className="mr-2 h-4 w-4" /> Re-generate</Button>
                  </div>
                </FormControl>
                <FormMessage/>
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
                    <Slider defaultValue={[field.value]} max={32} step={1} onValueChange={setPasswordLength}/>
                  </Card>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isIncludeSymbols"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <CardWithSlider
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    label="Include symbols"
                    description="e.g. !@#$%^&*()+_\-=}{[\]|:;/?.><,`~]"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isIncludeNumbers"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <CardWithSlider
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    label="Include numbers"
                    description="e.g. 123456"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isIncludeLowercase"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <CardWithSlider
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    label="Include lowercase"
                    description="e.g. abcdefgh"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isIncludeUppercase"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <CardWithSlider
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    label="Include uppercase"
                    description="e.g. ABCDEFGH"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="excludeSimilar"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <CardWithSlider
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    label="Exclude similar characters"
                    description="e.g. i, l, 1, L, o, 0, O"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default InputForm;