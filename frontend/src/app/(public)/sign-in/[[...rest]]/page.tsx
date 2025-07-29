"use client"

import { SignIn } from "@clerk/nextjs"

export default function page() {
  return (
    <div className="flex justify-center bg-gray-100 py-20">
      <SignIn path="/sign-in" routing="path" signInUrl="/sign-up"/>
    </div>
  )
}
