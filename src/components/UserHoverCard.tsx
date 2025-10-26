"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { VerifiedIcon, MapPin, CalendarDays } from "lucide-react";
import React from "react";

export function UserHoverCard() {
  const user = {
    name: "Hayden Bleasel",
    username: "@haydenbleasel",
    email: "hayden@example.com",
    image: "https://github.com/haydenbleasel.png",
    location: "San Francisco",
    joined: "Joined 2020",
    bio: "Product designer and developer building tools for creators.",
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="relative w-fit cursor-pointer">
          <Avatar className="rounded-lg">
            <AvatarImage alt={user.username} src={user.image} />
            <AvatarFallback className="rounded-lg">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="-bottom-1 -right-1 absolute flex size-4 items-center justify-center rounded-full bg-background">
            <VerifiedIcon className="size-full fill-blue-500 text-white" />
          </span>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.image} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div>
              <h4 className="font-semibold text-sm flex items-center gap-1">
                {user.name}
                <VerifiedIcon className="h-3 w-3 fill-blue-500 text-white" />
              </h4>
              <p className="text-muted-foreground text-sm">{user.username}</p>
              {/* <p className="text-xs text-muted-foreground">{user.email}</p> */}
            </div>
            <p className="text-sm">{user.bio}</p>

            <div className="flex items-center gap-4 text-muted-foreground text-xs">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {user.location}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {user.joined}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <Button size="sm" className="flex-1">
            View Profile
          </Button>
          <Button variant="destructive" size="sm" className="flex-1">
            Logout
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
