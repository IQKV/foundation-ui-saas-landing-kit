import { useState } from "react";
import { Icon } from "./Icon";
import { Tick02Icon } from "@hugeicons/core-free-icons";

interface PlanFeatures {
  prioritySupport: boolean;
  maxUsers: number;
  maxProjects: number;
}

interface PublicPlanEntry {
  planCode: string;
  displayName: string;
  description?: string;
  billingPeriod: "MONTHLY" | "ANNUAL";
  priceMinor: number;
  currency: string;
  features: PlanFeatures;
  scope: string;
  active: boolean;
}

interface PlanSelectorProps {
  plans: PublicPlanEntry[];
}

function formatPrice(priceMinor: number, currency: string) {
  const major = priceMinor / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(major);
}

export function PlanSelector({ plans }: PlanSelectorProps) {
  const [billingPeriod, setBillingPeriod] = useState<"MONTHLY" | "ANNUAL">("MONTHLY");

  const filteredPlans = plans.filter((p) => p.billingPeriod === billingPeriod);
  const displayPlans = filteredPlans.length > 0 ? filteredPlans : plans;

  return (
    <>
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-base-100 p-1 rounded-md shadow-lg">
          <button
            type="button"
            onClick={() => setBillingPeriod("MONTHLY")}
            className={`px-4 py-2 rounded-md font-medium ${
              billingPeriod === "MONTHLY"
                ? "bg-primary text-primary-content"
                : ""
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingPeriod("ANNUAL")}
            className={`px-4 py-2 rounded-md font-medium ${
              billingPeriod === "ANNUAL"
                ? "bg-primary text-primary-content"
                : ""
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {displayPlans.map((plan) => (
          <div key={plan.planCode} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-center mb-6">
                <h3 className="card-title justify-center text-2xl">
                  {plan.displayName}
                </h3>
                {plan.description && (
                  <p className="text-sm text-base-content/70 mt-2">
                    {plan.description}
                  </p>
                )}
                <div className="mb-2 mt-4">
                  <span className="text-5xl font-bold">
                    {formatPrice(plan.priceMinor, plan.currency)}
                  </span>
                  <span className="opacity-70">
                    /{plan.billingPeriod === "MONTHLY" ? "month" : "year"}
                  </span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Icon
                    icon={Tick02Icon}
                    size={20}
                    className="text-primary flex-shrink-0 mt-0.5"
                    client:load
                  />
                  <span>
                    {plan.features.maxUsers === 0
                      ? "Unlimited"
                      : plan.features.maxUsers}{" "}
                    Users
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    icon={Tick02Icon}
                    size={20}
                    className="text-primary flex-shrink-0 mt-0.5"
                    client:load
                  />
                  <span>
                    {plan.features.maxProjects === 0
                      ? "Unlimited"
                      : plan.features.maxProjects}{" "}
                    Projects
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    icon={Tick02Icon}
                    size={20}
                    className="text-primary flex-shrink-0 mt-0.5"
                    client:load
                  />
                  <span>
                    {plan.features.prioritySupport ? "Priority" : "Community"}{" "}
                    Support
                  </span>
                </li>
              </ul>
              <div className="card-actions">
                <a
                  href={import.meta.env.PUBLIC_APP_URL || "/"}
                  className="btn btn-primary btn-block"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
