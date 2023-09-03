"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Slider} from "@/components/ui/slider"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {toast} from "@/components/ui/use-toast"
import {useState} from "react";
import cardWithSlider from "@/components/cardWithSlider";
import CardWithSlider from "@/components/cardWithSlider";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function InputForm() {
  const [passwordLength, setPasswordLength] = useState([8])
  const [includeSpecialSymbols, setIncludeSpecialSymbols] = useState(false)
  const [includeAmbiguousSymbols, setIncludeAmbiguousSymbols] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="container max-w-screen-sm mx-auto py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row space-x-4">
                    <Input placeholder="Generated password" {...field} />
                    <Button>Copy</Button>
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Card className="p-6 space-y-4">
                    <div className="flex items-center justify-between space-y-2">
                      <Label htmlFor="top-p">Password length</Label>
                      <span
                        className="text-sm text-muted-foreground">
                          {passwordLength}
                        </span>
                    </div>
                    <Slider defaultValue={passwordLength} max={32} step={1} onValueChange={setPasswordLength}/>
                  </Card>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <CardWithSlider
                    onCheckedChange={setIncludeSpecialSymbols}
                    checked={includeSpecialSymbols}
                    label="Include special symbols"
                    description="e.g. @#$%"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <CardWithSlider
                    onCheckedChange={setIncludeAmbiguousSymbols}
                    checked={includeAmbiguousSymbols}
                    label="Include ambiguous symbols"
                    description="{ } [ ] ( ) / \ ' ` ~ , ; : . < >"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <CardWithSlider
                    onCheckedChange={setIncludeNumbers}
                    checked={includeNumbers}
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
            name="username"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <CardWithSlider
                    onCheckedChange={setIncludeLowercase}
                    checked={includeLowercase}
                    label="Include lowercase letters"
                    description="e.g. abcdefgh"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <CardWithSlider
                    onCheckedChange={setIncludeUppercase}
                    checked={includeUppercase}
                    label="Include uppercase letters"
                    description="e.g. ABCDEFGH"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <CardWithSlider
                    onCheckedChange={setExcludeSimilar}
                    checked={excludeSimilar}
                    label="Exclude similar characters"
                    description="e.g. i, l, 1, L, o, 0, O"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit">Re-generate</Button>
        </form>
      </Form>
    </div>
  )
}

export default InputForm;