import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Feature = () => {
  return (
    <div className="min-h-screen px-8 py-8">
      <p className="text-center text-xl text-lime-700 font-semibold mt-6">Start Donating for People</p>
      <h1 className="text-center text-5xl font-bold mt-4">Give Them A Reason To Smile</h1>
      <div className="flex flex-col md:flex-row gap-4 mt-12 w-6/7 justify-center items-center mx-auto">
        <div className="w-full md:w-1/4">
          <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video" />
            <img
              src="/image-8.jpg"
              alt="Event cover"
              className="relative z-20 aspect-video w-full object-cover brightness-100"
            />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle className="font-bold text-lg">Help For Food</CardTitle>
              <CardDescription>We provide proper care and support to women and children in need. </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-4">
              <Field className="w-full max-w-sm pt-2">
                <FieldLabel htmlFor="progress-upload">
                  <span>Donation Progress</span>
                  <span className="ml-auto">66%</span>
                </FieldLabel>
                <Progress value={45} id="progress-upload" />
                <FieldLabel htmlFor="progress-upload">
                  <span>Raised: ₹200</span>
                  <span className="ml-auto">Goal: ₹10000</span>
                </FieldLabel>
              </Field>
              <Button className="w-full bg-lime-700 hover:bg-lime-600 cursor-pointer">Donate</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full md:w-1/4">
          <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video" />
            <img
              src="/image-7.jpg"
              alt="Event cover"
              className="relative z-20 aspect-video w-full object-cover brightness-100"
            />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle className="font-bold text-lg">Give Health Support</CardTitle>
              <CardDescription>We provide proper care and support to women and children in need. </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-4">
              <Field className="w-full max-w-sm pt-2">
                <FieldLabel htmlFor="progress-upload">
                  <span>Donation Progress</span>
                  <span className="ml-auto">86%</span>
                </FieldLabel>
                <Progress value={86} id="progress-upload" />
                <FieldLabel htmlFor="progress-upload">
                  <span>Raised: ₹200</span>
                  <span className="ml-auto">Goal: ₹10000</span>
                </FieldLabel>
              </Field>
              <Button className="w-full bg-lime-700 hover:bg-lime-600">Donate</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full md:w-1/4">
          <Card className="relative mx-auto w-full max-w-sm pt-0 shadow-lg">
            <div className="absolute inset-0 z-30 aspect-video" />
            <img
              src="/image-6.jpg"
              alt="Event cover"
              className="relative z-20 aspect-video w-full object-cover brightness-100"
            />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle className="font-bold text-lg">Education For All</CardTitle>
              <CardDescription>We provide proper care and support to women and children in need. </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-4">
              <Field className="w-full max-w-sm pt-2">
                <FieldLabel htmlFor="progress-upload">
                  <span>Donation Progress</span>
                  <span className="ml-auto">66%</span>
                </FieldLabel>
                <Progress value={56} id="progress-upload" />
                <FieldLabel htmlFor="progress-upload">
                  <span>Raised: ₹200</span>
                  <span className="ml-auto">Goal: ₹10000</span>
                </FieldLabel>
              </Field>
              <Button className="w-full bg-lime-700 hover:bg-lime-600">Donate</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full md:w-1/4">
          <Card className="relative mx-auto w-full max-w-sm pt-0 shadow-lg">
            <div className="absolute inset-0 z-30 aspect-video" />
            <img
              src="/image-1.jpg"
              alt="Event cover"
              className="relative z-20 aspect-video w-full object-cover brightness-100"
            />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle className="font-bold text-lg">Woman and Child Care</CardTitle>
              <CardDescription>We provide proper care and support to women and children in need. </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-4">
              <Field className="w-full max-w-sm pt-2">
                <FieldLabel htmlFor="progress-upload">
                  <span>Donation Progress</span>
                  <span className="ml-auto">66%</span>
                </FieldLabel>
                <Progress value={66} id="progress-upload" />
                <FieldLabel htmlFor="progress-upload">
                  <span>Raised: ₹200</span>
                  <span className="ml-auto">Goal: ₹10000</span>
                </FieldLabel>
              </Field>
              <Button className="w-full bg-lime-700 hover:bg-lime-600">Donate</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Feature;
