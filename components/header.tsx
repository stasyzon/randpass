import ModeToggle from "@/components/themeToggle";

function Header() {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className="w-full flex flex-row items-center space-x-2">
        <h4 className="text-xl font-semibold tracking-tight">
          RandPass
        </h4>
        <h4 className="text-xl font-semibold tracking-tight">
          -
        </h4>
        <h4 className="text-xl font-semibold tracking-tight text-neutral-400">
          secure password generator
        </h4>
      </div>
      <ModeToggle/>
    </div>
  )
}

export default Header;