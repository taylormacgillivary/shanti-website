"use client";

import { useState, type FormEvent } from "react";
import { requestYttInfoPackage } from "@/app/actions/ytt-info-package";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const fieldClass = "mt-1 block w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-base text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07554f]";
const buttonClass = "h-auto min-h-11 w-full whitespace-normal bg-[#07554f] py-3 text-center text-white hover:bg-[#143d38]";

function InfoPackageForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Awaited<ReturnType<typeof requestYttInfoPackage>> | null>(null);
  const complete = result?.status === "requested" || result?.status === "already-requested";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = new FormData(event.currentTarget);
    setResult(null);
    setPending(true);
    try {
      setResult(await requestYttInfoPackage(form));
    } catch {
      setResult({ status: "error", message: "We couldn’t process your request. Please try again." });
    } finally {
      setPending(false);
    }
  }

  if (complete) {
    return (
      <div className="space-y-4">
        <div role="status" className="rounded-md bg-white/80 p-4 text-sm text-[#143d38]">
          {result?.status === "already-requested" ? (
            <>
              You’ve already requested a copy. {" "}
              <a className="font-semibold underline" href="/ytt-2027-info-package.pdf" download>Download the PDF</a>.
            </>
          ) : (
            <><strong className="block text-base">Check your inbox</strong>Look for an email from Shanti Yoga with your download link.</>
          )}
        </div>
        <DialogClose asChild>
          <Button type="button" className={buttonClass}>Done</Button>
        </DialogClose>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-sm font-semibold text-[#143d38]">
        First name
        <input className={fieldClass} name="firstName" autoComplete="given-name" maxLength={100} required />
      </label>
      <label className="block text-sm font-semibold text-[#143d38]">
        Email address
        <input className={fieldClass} name="email" type="email" autoComplete="email" maxLength={254} required />
      </label>
      <div hidden>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="text-xs leading-relaxed text-stone-600">
        By submitting, you agree to receive emails from Shanti Hot Yoga. You can unsubscribe at any time.
      </p>
      {result && (
        <div role="alert" className="rounded-md border border-stone-300 bg-white/80 p-3 text-sm text-stone-800">
          {result.status === "error" && result.message}
          {result.status === "pending" && "Check your inbox for a subscription confirmation from Shanti Yoga, then submit this form again."}
          {result.status === "resubscribe" && "This address needs to opt back in. Try another email or contact info@shantihotyoga.ca for the package."}
          {result.status === "unavailable" && "We can’t send to this address. Try another email or contact info@shantihotyoga.ca for the package."}
        </div>
      )}
      <Button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Submitting…" : "Email me the info package"}
      </Button>
    </form>
  );
}

export function YttInfoPackageSignup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" size="lg" className={buttonClass}>Get the Info Package</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-md overflow-y-auto rounded-2xl border-stone-200 bg-[#fbf5e8] p-6 sm:rounded-2xl sm:p-8">
        <DialogHeader className="pr-5 text-left">
          <DialogTitle className="font-serif text-2xl font-semibold leading-tight text-[#143d38]">
            Get the 2027 YTT info package
          </DialogTitle>
          <DialogDescription className="text-stone-700">
            Enter your name and email and we’ll send you the guide to Shanti’s 200-hour Yoga Teacher Training.
          </DialogDescription>
        </DialogHeader>
        <InfoPackageForm />
      </DialogContent>
    </Dialog>
  );
}
