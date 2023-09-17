import ModeToggle from "@/components/themeToggle";

function Header() {
  return (
    <div className="w-full flex flex-row justify-center items-center">
      <div className="w-full flex flex-col items-start flex-wrap">
        <h4 className="text-xl font-semibold tracking-tight">
          RandPass
        </h4>
        <p className="text-sm text-muted-foreground">Secure password generator</p>
      </div>
      <ModeToggle/>
    </div>
  )
}

export default Header;