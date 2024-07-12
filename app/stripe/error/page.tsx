import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";  // Import an appropriate icon for error
import Link from "next/link";

export default function ErrorStripe() {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <XCircle className="text-red-600 w-16 h-16 mx-auto my-6" />  {/* Updated icon and color */}
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Order Canceled
          </h3>
          <p className="text-gray-600 my-2">
            Unfortunately, there was an issue with your order and it has been canceled.
          </p>
          <p>Please try again later or contact support for assistance.</p>

          <Button asChild className="mt-5">
            <Link href="/">GO back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
