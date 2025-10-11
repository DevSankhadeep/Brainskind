import { PopoverContent } from '@radix-ui/react-popover';
import React from 'react'
import { Link } from "react-router-dom";
import { Button } from '../button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { LogOut, User2 } from 'lucide-react';

const Navbar() {
  const user = false;
  return (
    <div className="bg-white"></div>>
      <div className="flex items-center justify between mx-auto max-w-7xl h-16">
        <div>
        <div>
          <h1 className="text-2xl font-bol">
            Job <span className="text-blue-500">Portal</span>
          </h1>
        </div>
        <div>
          <ul className="flex front-medium items-center gap-6">
            <li>Home</li>
            <li>Browse</li>
            <li>Job</li>
          </ul>
          {
            !user ? (
              <div className="flex items-center gap-2">
                <Button variant="outline">Login</Button>
                <Button className="bg-red-400">Register</Button>
              </div>
            ) : (
              <Popover>
          <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
           src="https://github.com/shadcn.png" 
           alt="@shadcn"
           />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

          </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex items-center gap-4 space-y-2">
                <Avatar className="cursor-pointer">
          <AvatarImage
           src="https://github.com/shadcn.png" 
           alt="@shadcn"
           />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="front-medium">Anindita Maity</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, fuga error deserunt illo porro magni?</p>
        </div>
              <div className="flex flex-col text-gray-600 gap-4">
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <User2></User2>
                  <Button variant="link">Profile</Button>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <LogOut></LogOut>
                  <Button variant="link">Logout</Button>
                </div>
              </div>
              
              
            </div>
            </PopoverContent>
          </Popover>

            )
          }
          
          
        </div>
      </div>
    </div>
  );
};

export default Navbar
