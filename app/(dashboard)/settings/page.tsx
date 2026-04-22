"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    // TODO: wire to /api/user/update
    await new Promise((r) => setTimeout(r, 800))
    toast.success("Settings saved")
    setSaving(false)
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <Header title="Settings" />
      <main className="flex-1 p-6">
        <div className="max-w-xl space-y-6">
          {/* Business profile */}
          <Card>
            <CardHeader>
              <p className="font-semibold text-slate-900">Business Profile</p>
              <p className="text-sm text-slate-500">
                This info is used for your website, SEO listings, and reports.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="companyName">Business name</Label>
                    <Input id="companyName" placeholder="Apex Electric LLC" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" placeholder="Electrical" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" placeholder="(817) 555-0123" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="website">Current website (optional)</Label>
                    <Input id="website" type="url" placeholder="https://yoursite.com" />
                  </div>
                </div>
                <Separator />
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save changes"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Account */}
          <Card>
            <CardHeader>
              <p className="font-semibold text-slate-900">Account</p>
              <p className="text-sm text-slate-500">
                Manage your name, email, and password via Clerk.
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">
                Account settings (email, password, 2FA) are managed through your Clerk
                profile. Click your avatar in the top-right corner to access them.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
