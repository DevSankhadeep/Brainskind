import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../button'
import { Avatar, AvatarImage, AvatarFallback } from '../avatar'
import { Popover, PopoverTrigger, PopoverContent } from '../popover'
import { LogOut, User2 } from 'lucide-react'

const Navbar = () => {
  const user = false // change to true to see the logged-in UI

  return (
    <header className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-blue-500">Portal</span>
          </h1>
        </div>

        <nav className="flex items-center gap-6">
          <ul className="flex font-medium items-center gap-6">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/browse">Browse</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button className="bg-red-400">Register</Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button aria-label="User menu">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-medium">Anindita Maity</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className="mt-3 flex flex-col text-gray-600 gap-2">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">Profile</Button>
                      </div>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <LogOut />
                        <Button variant="link">Logout</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>

      </div>
    </header>
  )
}

export default Navbar
