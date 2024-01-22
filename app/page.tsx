import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <MaxWidthWrapper className="">
      <div className="py-100 mx-auto text-center flex flex-col items-center max-w-3xl  ">
        <div className="box h-[15vh] w-[15vh] sm:pt-[5vh] sm:h-[30vh] sm:w-[30vh] flex justify-center">
          <div className="circle1 h-[15vh] w-[15vh] sm:h-[30vh] sm:w-[30vh]"></div>
          <div className="circle2 h-[15vh] w-[15vh] sm:h-[30vh] sm:w-[30vh]"></div>
          <div className="circle3 h-[15vh] w-[15vh] sm:h-[30vh] sm:w-[30vh]"></div>
        </div>
      </div>
      <div className="py-10 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Let&apos;s interact with the{' '}
          <span className=" text-blue-600">
            algorithms
          </span>
          .
        </h1>
        <p className="mt-6 text-large max-w-prose text-muted-foreground"> Welcome to visualiser. See the magic unfold in code, transform complexity into clarity, making learning and exploring algorithms an enchanting experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/seiveoferatosthenes" className={buttonVariants()}>
            Seive of Eratosthenens
          </Link>
          <Button variant='ghost'> Peak in 2D &rarr;</Button>
        </div>
      </div>
    </MaxWidthWrapper >
  );
}
