"use client"
import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [arr, setArr] = useState<number[]>(
    new Array(101).fill(1).map((_, i) => 1)
  );
  const [stepText, setStepText] = useState('');
  const [primeText, setPrimeText] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    // setArr([0, 0, ...arr]); // Mark 0 and 1 as non-prime
    console.log(arr);
    setGrid();
  }, []);
  const setGrid = () => {
    if (tableRef.current) {
      tableRef.current.innerHTML = '';
      for (let i = 0; i < 100; i++) {
        const td = document.createElement('div');

        td.id = (i + 1).toString();
        td.textContent = (i + 1).toString();
        tableRef.current.appendChild(td);
      }
    }
  };
  const setPrime = (id: number) => {
    const td = document.getElementById(id.toString());
    if (td) {
      td.style.backgroundColor = '#14452F';
      td.style.color = 'white';

    }
  };

  const setNonPrime = (id: number) => {
    const td = document.getElementById(id.toString());

    if (td) {
      td.style.backgroundColor = '#FF6868';
      td.style.color = 'white';
    }
  };

  const handleStart = async () => {
    setNonPrime(1);
    setIsRunning(true);
    setStepText('Step: 1 is non prime it is set red');
    setPrimeText('Prime: ');
    await new Promise((resolve) => setTimeout(resolve, 500));

    await findPrimeNumbers(2);
  };
  const handleReset = () => {
    // Reset state and grid
    // setArr(new Array(101).fill(1).map((_, i) => 1));
    // setStepText('');
    // setPrimeText('Prime: ');
    // setIsRunning(false);
    // setGrid();
    window.location.reload();
  };
  const findPrimeNumbers = async (i: number) => {

    if (i > 100) {
      setIsRunning(false);
      return;
    }
    if (arr[i] === 1) {
      // Mark i as prime and update text
      setPrime(i);
      setStepText(`Step: ${i} is still white so it is prime and set to green, all its multiples set to red`);
      setPrimeText((prevText) => prevText + `${i},`);
      await markMultiples(i);
    } else {
      // Update text indicating non-prime number
      setStepText(`Step: ${i} is red so it is non-prime`);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visual effect
    }

    // Find next prime number
    await findPrimeNumbers(i + 1);
  };
  const markMultiples = async (prime: number) => {
    for (let j = prime * 2; j <= 400; j += prime) {
      if (arr[j] === 1) {
        setNonPrime((j));
        arr[j] = 0;
        await new Promise((resolve) => setTimeout(resolve, 250)); // Delay for visual effect
      }
    }
  };

  return (
    <MaxWidthWrapper className="h-full w-full bg-white soe-wrapper pb-10">
      <div id="soe-wrapper" className=" py-100 w-full mx-auto text-center flex flex-col xl:flex-row items-cetner">
        <div className="soe-algo w-full xl:w-[50%] flex items-start flex-col p-4" >
          <h1 className="font-bold justify-start text-2xl my-6 items-start">Sieve of Eratosthenes</h1>
          <p className="text-sm text-start">
            Sieve of Eratosthenes is a famous simple algorithm use to find all the primes nos. upto certain limit.
          </p>
          <h3 className="font-bold text-xl">Algorithm:</h3>
          <ol className="text-sm text-start">
            <li className="text-xs">
              Intialize an array of size n with all the values 1(where n is limit upto which prime number needed).
            </li>
            <li className="py-2">
              Set <span className="font-bold">arr[0]</span> and <span className="font-bold">arr[1]</span> as 0 as they are not prime.
            </li>
            <li className=" text-red-800">
              Intialize i as 2.
            </li>
            <li>
              <span className="font-bold">
                While i*i is less than equal to n.
              </span>
              <ol type="A" className="ml-4">
                <li>If arr[i]==1
                  <ol type="i" className="ml-4">
                    <li>Intialize j to i+i</li>
                    <li>while j is less than equal to n
                      <ol type="I">
                        <li>arr[j]=0</li>
                        <li>j=j+i</li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li>i=i+1</li>
              </ol>
            </li>
          </ol>
          <div className="flex py-5 gap-4 sm:gap-10 w-full ">

            <Button id="start" variant="default" className="font-bold" disabled={isRunning} onClick={handleStart}>Start Visulaization</Button>
            <br />
            <br />
            <Button id="reset" variant="destructive" className="font-bold" onClick={handleReset}>Reset</Button>
          </div>
        </div>
        <div className="table-wrapper w-full xl:w-[50%] flex justify-center items-center">
          <div id="table" ref={tableRef} className="grid grid-cols-10 text-sm "></div>
        </div>
      </div>
      <p id="step" className="mt-10 sm:mt-0 w-full text-center  bg-blue-200  font-medium py-4 rounded-md mb-4 text-xs sm:text-[15px]">{stepText ? stepText : "Steps of the algorithm will be displayed here "}</p>

      <div id="prime" className=" w-full text-center  bg-green-200 py-4 rounded-md text-xs  font-semibold sm:text-lg"> {primeText ? primeText : "All the prime numbers will be displayed here"}</div>
    </MaxWidthWrapper >
  );
}
