import type { ComponentType } from "react";

import { ArrowRightIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

type Features = {
  icon: ComponentType;
  title: string;
  description: string;
  cardBorderColor: string;
  avatarTextColor: string;
  avatarBgColor: string;
  imageSrc: string;
  progress: number;
  raised: number;
  goal: number;
}[];

const Features = ({ featuresList }: { featuresList: Features }) => {
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-4 sm:mb-16 lg:mb-24 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">Donate Support to Make Difference way</h2>
          <p className="text-muted-foreground text-xl">
            Charity is the voluntary act of giving help, typically in the form of money, time, or resources, to those in
            need. Charitable organizations aim to solve social, environmental, and economic challenges by addressing
            issues like poverty
          </p>
          <Button variant="outline" className="rounded-lg text-base shadow-none has-[>svg]:px-6" size="lg" asChild>
            <a href="#">
              See all features
              <ArrowRightIcon />
            </a>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuresList.map((features, index) => (
            <Card key={index} className="relative mx-auto w-full max-w-sm pt-0">
              <div className="absolute inset-0 z-30 aspect-video" />
              <img
                src={features.imageSrc}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-100"
              />
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">Featured</Badge>
                </CardAction>
                <CardTitle className="font-bold text-lg">{features.title}</CardTitle>
                <CardDescription>{features.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col gap-4">
                <Field className="w-full max-w-sm pt-2">
                  <FieldLabel htmlFor="progress-upload">
                    <span>Donation Progress</span>
                    <span className="ml-auto">{features.progress}%</span>
                  </FieldLabel>
                  <Progress value={features.progress} id="progress-upload" />
                  <FieldLabel htmlFor="progress-upload">
                    <span>Raised: ₹{features.raised}</span>
                    <span className="ml-auto">Goal: ₹{features.goal}</span>
                  </FieldLabel>
                </Field>
                <Button className="w-full cursor-pointer">Donate</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
