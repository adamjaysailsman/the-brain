import { CheckIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProgressBar({ steps }) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
              "relative"
            )}
          >
            {step.status === "complete" ? (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="h-0.5 w-full bg-indigo-600 dark:bg-indigo-500" />
                </div>
                <div className="relative flex size-8 items-center justify-center rounded-full bg-indigo-600 dark:bg-indigo-500">
                  <CheckIcon aria-hidden="true" className="size-5 text-white" />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : step.status === "current" ? (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="h-0.5 w-full bg-gray-200 dark:bg-white/15" />
                </div>
                <div
                  aria-current="step"
                  className="relative flex size-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white dark:border-indigo-500 dark:bg-gray-900"
                >
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500"
                  />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="h-0.5 w-full bg-gray-200 dark:bg-white/15" />
                </div>
                <div className="relative flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:border-white/15 dark:bg-gray-900">
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full bg-transparent"
                  />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
