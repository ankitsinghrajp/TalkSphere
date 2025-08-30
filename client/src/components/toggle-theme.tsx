import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme,theme } = useTheme()

  return (
    <Button
    className="cursor-pointer"
     variant={'outline'}
      size={'icon'}
      onClick={()=>setTheme(theme=="dark"?"light":"dark")}
      >
        {theme== "dark"?<Sun/>:<Moon/>}
    </Button>
  )
}