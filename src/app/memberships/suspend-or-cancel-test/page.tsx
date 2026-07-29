"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CancelForm,
  MembershipSuccessMessage,
  SuspendForm,
} from "@/components/membership-manage-forms";

const TEST_PASSWORD = "yoga1234";
const AUTH_STORAGE_KEY = "membership-form-test-unlocked";

export default function SuspendOrCancelTestPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"suspend" | "cancel" | null>(
    null
  );
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(AUTH_STORAGE_KEY) === "true") {
        setUnlocked(true);
      }
    } catch {
      // sessionStorage unavailable
    }
    setCheckingAuth(false);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === TEST_PASSWORD) {
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      } catch {
        // sessionStorage unavailable
      }
      setUnlocked(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSelectedOption(null);
    setShowSuccess(false);
  };

  const handleSelectOption = (option: "suspend" | "cancel") => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    setSelectedOption(null);
    setShowSuccess(false);
  };

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOption(null);
    setShowSuccess(false);
  };

  if (checkingAuth) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          Loading…
        </div>
      </section>
    );
  }

  if (!unlocked) {
    return (
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                Internal test page
              </p>
              <h1 className="text-2xl font-bold">Membership Form Test</h1>
              <p className="text-muted-foreground">Enter the password to continue.</p>
            </div>
            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-password">Password</Label>
                <Input
                  id="test-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              {passwordError && (
                <p className="text-sm text-red-600">{passwordError}</p>
              )}
              <Button type="submit" className="w-full gradient-sage text-white">
                Unlock
              </Button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="bg-amber-100 border-b border-amber-200 py-2 text-center text-sm text-amber-900 font-medium">
        Internal test page — cancel form enabled for production testing
      </div>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images-in-use/08.jpg"
            alt="Shanti Hot Yoga"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Suspend or Cancel Your{" "}
              <span className="gradient-sage-text">Membership</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-8">
              We understand that life happens. If you need to take a break or end
              your membership, we&apos;re here to help.
            </p>
            <Button
              onClick={handleOpenModal}
              size="lg"
              className="gradient-sage text-white px-8 py-4 text-lg"
            >
              Suspend or Cancel Your Membership
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {showSuccess ? (
            <MembershipSuccessMessage
              onClose={handleCloseModal}
              type={selectedOption || "suspend"}
            />
          ) : !selectedOption ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Manage Your Membership</DialogTitle>
                <DialogDescription>
                  Please select whether you&apos;d like to suspend or cancel your
                  membership.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <Button
                  onClick={() => handleSelectOption("suspend")}
                  variant="outline"
                  className="h-auto py-6 flex flex-col items-start text-left"
                >
                  <span className="font-semibold text-lg mb-2">
                    Suspend Your Membership
                  </span>
                  <span className="text-sm text-muted-foreground font-normal">
                    Take a temporary break from your membership (30-60 days)
                  </span>
                </Button>

                <Button
                  onClick={() => handleSelectOption("cancel")}
                  variant="outline"
                  className="h-auto py-6 flex flex-col items-start text-left"
                >
                  <span className="font-semibold text-lg mb-2">
                    Cancel Your Membership
                  </span>
                  <span className="text-sm text-muted-foreground font-normal">
                    Permanently end your membership
                  </span>
                </Button>
              </div>
            </>
          ) : selectedOption === "suspend" ? (
            <SuspendForm onBack={handleBack} onSuccess={handleSuccess} />
          ) : (
            <CancelForm onBack={handleBack} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
