"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const corporatePartners = [
  "ABM (Amec Black & MacDonald)",
  "Acadian Seaplants",
  "Adesa",
  "Admiral Insurance",
  "Air Canada",
  "Allegion",
  "Apple",
  "Applehead Studio Inc.",
  "Arrow Electronics",
  "Atlantic Business Interiors",
  "Backroads",
  "Bank of Montreal (BMO)",
  "Bank of Nova Scotia",
  "Bell",
  "Bell Aliant",
  "Bell Media",
  "Bertossi Group",
  "Big Brothers Big Sisters",
  "Bird Construction",
  "Black & MacDonald",
  "Blender Networks",
  "Bluedrop",
  "Bluewater Group",
  "Bowers Construction",
  "Boyne Clarke",
  "Bryant Realty",
  "Burchell Wickwire Bryson LLP",
  "Canada Post",
  "Canadian Blood Services",
  "CarbonCure Technologies",
  "Casino NS",
  "CIBC",
  "Cineplex Entertainment/Media",
  "CITCO",
  "Cole Health Centre",
  "Compass Pharmacy",
  "Concentrix",
  "Cox & Palmer",
  "Crown Roofing Specialists",
  "CTV (Bell Media)",
  "CUA (Credit Union Atlantic)",
  "CUPE",
  "Dalhousie University",
  "David's Tea",
  "Department of National Defence",
  "Duart Hardwood Stairs/Flooring",
  "East Coast Credit Union",
  "Economical Insurance",
  "EfficiencyOne (NS)",
  "ELU Fitness",
  "EMC",
  "Enlighten Laser",
  "enVie Vegan Restaurant",
  "Ernst & Young",
  "ESM (Endless Savings & More)",
  "Events East / Convention Centre",
  "Family Vision Clinic",
  "Farnell Packaging Limited",
  "Fleetway Inc. (Irving)",
  "Government of Canada",
  "Grant Thornton",
  "Grants Planning & Shutdown Services",
  "Graybar",
  "Health Association of NS",
  "HIAA (Hfx Int'l Airport Authority)",
  "HRM (City of Halifax)",
  "Innovacorp",
  "Innovasea",
  "Intact Insurance",
  "Irving Shipbuilding",
  "ISANS",
  "IWK",
  "Jazz Aviation",
  "Killam Perks Rate",
  "KPMG",
  "L-3 Electronics",
  "LimeLight Group",
  "Lion's Roar Magazine",
  "Lively Bakery",
  "Lockheed Martin",
  "Maritime Paper",
  "Marriott Hotels",
  "Maritime Race Weekend",
  "Microsoft",
  "Mt. St. Vincent University",
  "MUFG Investor Services",
  "Neocon",
  "Northwood",
  "NSCC",
  "NSGEU",
  "NS Government (Province of NS)",
  "NS Health Authority",
  "NSLC",
  "NSNU (Nurses Union)",
  "NS Power/Emera",
  "NSTU (NS Teacher's Union)",
  "NTT Data",
  "O'Regans",
  "Oceanside Equipment Ltd.",
  "Office Interiors",
  "One Wind (SparkPower)",
  "Over The Edge",
  "Owens MacFadyen Group",
  "Parkland (Blue Wave Energy)",
  "PCL Construction",
  "Pharmacy Association of NS (PANS)",
  "Proposify",
  "RBC (Royal Bank of Canada)",
  "RCS",
  "Rexel Canada",
  "Salvatore Insurance",
  "Salesforce",
  "Shoreham Village",
  "Southwest Properties",
  "Sport NS",
  "Stantec",
  "St. Mary's University",
  "Stewart McKelvey",
  "Sunwing Airlines",
  "TD Bank",
  "The Berkeley",
  "Toromont Cat",
  "Trim-Line / United Sign",
  "Ultra Electronics",
  "Vemco",
  "Virgin Radio Stations (Bell Media)",
  "VistaCare Communications",
  "Volta",
  "Workspace",
  "WSP",
]

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

function getAvailableLetters(partners: string[]): Set<string> {
  const letters = new Set<string>()
  partners.forEach((partner) => {
    const firstChar = partner.charAt(0).toUpperCase()
    if (/[A-Z]/.test(firstChar)) {
      letters.add(firstChar)
    }
  })
  return letters
}

function filterByLetter(partners: string[], letter: string): string[] {
  return partners
    .filter((partner) => partner.charAt(0).toUpperCase() === letter)
    .sort((a, b) => a.localeCompare(b))
}

export default function CorporatePartnersPage() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const availableLetters = getAvailableLetters(corporatePartners)

  const filteredPartners = selectedLetter
    ? filterByLetter(corporatePartners, selectedLetter)
    : []

  return (
    <div className="bg-white dark:bg-gray-950 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-4">
            Corporate <span className="gradient-sage-text">Partners</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check if your employer is one of our corporate partners. Employees of partner 
            organizations receive a discount on memberships.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg mb-8">
            <p className="text-center text-gray-700 dark:text-gray-300 mb-4 font-medium">
              Select the first letter of your company name:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {alphabet.map((letter) => {
                const isAvailable = availableLetters.has(letter)
                const isSelected = selectedLetter === letter

                return (
                  <button
                    key={letter}
                    onClick={() => isAvailable && setSelectedLetter(letter)}
                    disabled={!isAvailable}
                    className={`
                      w-10 h-10 rounded-lg font-semibold text-sm transition-all
                      ${isSelected
                        ? "gradient-sage text-white shadow-lg scale-110"
                        : isAvailable
                          ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      }
                    `}
                  >
                    {letter}
                  </button>
                )
              })}
            </div>
          </div>

          {selectedLetter ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                  Companies starting with &ldquo;{selectedLetter}&rdquo;
                </h2>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
                >
                  Clear selection
                </button>
              </div>

              {filteredPartners.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredPartners.map((partner, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="w-8 h-8 gradient-sage rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">{partner}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No companies found starting with &ldquo;{selectedLetter}&rdquo;.
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="w-16 h-16 gradient-sage rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Select a letter above to search for your company
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                We have over 100 corporate partners
              </p>
            </div>
          )}

          <div className="mt-12 bg-gray-100 dark:bg-gray-900 p-8 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">
              Don&apos;t see your company?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Contact us to inquire about setting up a new corporate partnership for your organization.
            </p>
            <Button className="gradient-sage text-white" asChild>
              <a href="mailto:info@shantihotyoga.ca?subject=corporate%20partner%20request">
                Request a Partnership
              </a>
            </Button>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/memberships"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
            >
              &larr; Back to Memberships
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
