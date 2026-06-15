"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import FormLayout from "@/components/shadcn-studio/blocks/form-layout-02/form-layout-02";
import Image from "next/image";

const ReportPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 h-17.5 w-full border-b transition-all duration-300",
          {
            "bg-background shadow-md": isScrolled,
          },
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <Image src="/logo-3.png" alt="logo" width={40} height={40} />
            <span className="text-primary text-[20px] font-semibold">
              GoodDeed Foundation
            </span>
          </a>
        </div>
      </header>

      <div className="pt-32 py-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FormLayout />
        </div>
      </div>
    </>
  );
};

export default ReportPage;
