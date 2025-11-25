"use client"

import AccountDetailsForm from "./AccountDetailsForm"
import PassswordChangeForm from "./PassswordChangeForm"

function Settings() {
  return (
    <div className="space-y-5">
        <AccountDetailsForm />
        <PassswordChangeForm />
    </div>
  )
}

export default Settings