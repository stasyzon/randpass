import ModeToggle from "@/components/themeToggle";
import {Coolshape} from "coolshapes-react";
import {Lock} from 'lucide-react';

function Header() {
  return (
    <div className="w-full flex flex-row justify-center items-center">
      <div className="relative mr-2">
        <Coolshape
          type="misc"
          index={8}
          noise={true}
          size={48}
        />
        <Lock color="#fff" className="absolute inset-0 m-auto"/>
      </div>
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