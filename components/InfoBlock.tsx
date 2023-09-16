import {Separator} from "@/components/ui/separator";
import {Card} from "@/components/ui/card";

function InfoBlock() {
  return (
    <Card className="w-full p-5 space-y-5">
      <div className="space-y-4">
        <h4 className="font-semibold tracking-tight text-md">RandPass: Next-Gen Password Protection</h4>
        <p className="text-sm">Welcome to RandPass, where modern technology meets everyday security needs. In an
          online world that&apos;s
          always evolving, so are the threats. That&apos;s where we come in. With just a few taps, RandPass crafts
          passwords that aren’t just tough—they&apos;re virtually unbeatable. Whether you&apos;re keeping your
          financial data
          secure, guarding your emails, or just locking down your social media, RandPass is the modern choice for a
          digital-first world.</p>
      </div>
      <Separator/>
      <div className="space-y-4">
        <h4 className="font-semibold tracking-tight text-md">Beyond Just Passwords: The RandPass Difference</h4>
        <p className="text-sm">You&apos;ve used password generators, but not like this. RandPass isn&apos;t just about
          creating a string of
          characters; it&apos;s about giving you the reins. Want longer, trickier, or a specific set of characters? No
          problem. Our state-of-the-art tech doesn&apos;t just follow standards; it sets them. And with our commitment
          to
          generating passwords that stand strong against both brute-force and dictionary attacks, you&apos;re always
          one
          step ahead. Dive into the future of security with RandPass.</p>
      </div>
    </Card>
  )
}

export default InfoBlock;