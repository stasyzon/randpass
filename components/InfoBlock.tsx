import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

function InfoBlock() {
  return (
    <>
      <Card className="w-full p-5 space-y-5">
        <div className="space-y-4">
          <h4 className="font-semibold tracking-tight text-md">
            Enhancing your digital security with RandPass: The Ultimate Password
            Generator
          </h4>
          <p className="text-sm">
            In the digital realm, where security breaches are increasingly
            common, the need for robust passwords has never been more critical.
            RandPass, our state-of-the-art password generator, is your ally in
            this fight, offering advanced, secure password solutions.
          </p>
        </div>
        <Separator />
        <div className="space-y-4">
          <h4 className="font-semibold tracking-tight text-md">
            RandPass: A blend of complexity and security
          </h4>
          <ul className="text-sm list-disc ml-3 space-y-2">
            <li>
              <strong>Advanced Complexity:</strong> RandPass crafts passwords
              combining uppercase and lowercase letters, numbers, and symbols.
              This mix is pivotal for creating algorithmically complex
              passwords, thwarting brute-force attack
            </li>
            <li>
              <strong>Optimal Length for Maximum Security: </strong> RandPass
              advocates for passwords with at least 12 characters. Each
              additional character significantly boosts the password security,
              making it harder for cybercriminals to crack
            </li>
            <li>
              <strong>Superior Randomization Algorithms: </strong> At the core
              of RandPass is a sophisticated randomization algorithm, ensuring
              each password is both unique and unpredictable, safeguarding
              against pattern-based cracking techniques
            </li>
            <li>
              <strong>Effortless Regular Updates: </strong> Changing passwords
              regularly can be a hassle, but not with RandPass. Our service
              automates this process, delivering new, robust passwords at your
              chosen intervals, keeping your digital profiles consistently
              secure
            </li>
          </ul>
          <Separator />
          <h4 className="font-semibold tracking-tight text-md">
            Why RandPass stands out
          </h4>
          <ul className="text-sm list-disc ml-3">
            <li>Cryptographic-level randomization</li>
            <li>Compliance with the latest cybersecurity protocols</li>
            <li>
              Unique passwords free from personal biases or predictable patterns
            </li>
          </ul>
          <Separator />
          <p className="text-sm">
            Your first line of defense in the digital world is your password.
            RandPass is not just a tool; it is your partner in securing your
            digital identity. With RandPass, you are not just generating
            passwords; you are fortifying your digital life against
            ever-evolving cyber threats. Start your journey towards enhanced
            digital security with RandPass today
          </p>
        </div>
      </Card>
      <Card className="w-full p-5 space-y-5">
        <div className="space-y-4">
          <h4 className="font-semibold tracking-tight text-md">
            Effective Use of RandPass-Generated Passwords
          </h4>
          <ul className="list-disc ml-3 space-y-2 text-sm">
            <li>
              <strong>Unique Passwords for Each Account:</strong> Avoid using
              the same password across multiple accounts. RandPass can generate
              a unique password for each of your online profiles, significantly
              reducing the risk of simultaneous breaches
            </li>
            <li>
              <strong>Regular Password Updates: </strong>Change your passwords
              periodically. With RandPass, you can set a schedule to generate
              new passwords, ensuring your accounts remain secure over time
            </li>
            <li>
              <strong>Secure Storage: </strong>Remembering complex passwords can
              be challenging. Use a trusted password manager, preferably one
              that offers encrypted storage, to keep your RandPass-generated
              passwords safe and accessible
            </li>
            <li>
              <strong>Be Cautious with Password Sharing: </strong>Avoid sharing
              your passwords. If you must, do so through secure channels and
              change the password soon after
            </li>
            <li>
              <strong>
                Enhance Security with Two-Factor Authentication (2FA):{" "}
              </strong>
              Whenever possible, enable 2FA on your accounts. A strong password
              coupled with a second form of verification drastically improves
              your account's security
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
}

export default InfoBlock;
