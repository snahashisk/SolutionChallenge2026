"use client";
import { MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useUserStore } from "@/store/user";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

import { IndianStates } from "@/constant";
import { countries } from "@/constant";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

const FormLayout = () => {
  const router = useRouter();

  const fullName = useUserStore((state) => state.user?.fullName);
  const email = useUserStore((state) => state.user?.email);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");

  const [reporttitle, setReportTitle] = useState("");
  const [category, setCategory] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [affectedpeople, setAffectedPeople] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [supportingimage, setSupportingImage] = useState<File | null>(null);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const getLocation = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.success("Location fetched successfully");
        },
        (error) => {
          toast.error("Failed to fetch location");
          console.error(error);
        },
      );
    } else {
      toast.error("Please enable location services");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getCoordinatesPromise = (): Promise<{
    lat: number;
    lng: number;
  } | null> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
          resolve(null);
        },
        { timeout: 5000 },
      );
    });
  };

  const stateData = IndianStates.find((s) => s.name === selectedState);
  const districts = stateData?.districts || [];
  const districtData = districts.find((d) => d.name === selectedDistrict);
  const areas = districtData?.areas || [];
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    let currentLoc = location;
    if (!currentLoc) {
      currentLoc = await getCoordinatesPromise();
      if (currentLoc) {
        setLocation(currentLoc);
      }
    }

    const formData = new FormData();

    formData.append("title", reporttitle);
    formData.append("reporterName", fullName || firstName + " " + lastName);
    formData.append("reporterEmail", email || userEmail);
    formData.append("category", category);
    formData.append("description", reportDescription);
    formData.append("affectedPeople", affectedpeople);
    formData.append("landmark", landmark);
    formData.append("address", address);
    formData.append("locality", selectedArea);
    formData.append("city", selectedDistrict);
    formData.append("state", selectedState);
    formData.append("pinCode", pincode);
    formData.append("country", country);
    if (currentLoc) {
      formData.append("location", `${currentLoc.lat},${currentLoc.lng}`);
    }

    if (supportingimage) {
      formData.append("imageOfReport", supportingimage);
    }

    try {
      if (email) {
        const response = await axiosInstance.post(
          "/api/v1/report/report",
          formData,
          {
            withCredentials: true,
          },
        );
        toast.success("Report submitted successfully");
        router.push(`/dashboard`);
      } else if (isEmailVerified) {
        const response = await axiosInstance.post(
          "/api/v1/report/anonymous-report",
          formData,
          {
            withCredentials: true,
          },
        );
        toast.success("Report submitted successfully");
        router.push(`/`);
      } else {
        toast.error("Please verify your email address");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  const handleSendAnonymousOtp = async () => {
    setloading(true);
    try {
      const response = await axiosInstance.post(
        "/api/v1/anonymous/sendotp",
        {
          fullName: (fullName || "") + " " + (lastName ? lastName : ""),
          email: userEmail || "",
        },
        {
          withCredentials: true,
        },
      );
      toast.success("OTP sent successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  const handleVerifyAnonymousOtp = async () => {
    setloading(true);
    try {
      const response = await axiosInstance.post(
        "/api/v1/anonymous/verifyotp",
        {
          email: userEmail || "",
          otp: otp || "",
        },
        {
          withCredentials: true,
        },
      );
      toast.success("OTP verified successfully");
      setIsEmailVerified(true);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Information */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="space-y-1">
          <h2 className="font-semibold">Personal Information</h2>
          <p className="text-muted-foreground text-sm">
            Enter your contact details and address information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-2">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="first-name">First Name</Label>
            {fullName ? (
              <Input
                id="first-name"
                placeholder={`${fullName?.split(" ")[0]}`}
                value={fullName?.split(" ")[0]}
                readOnly
              />
            ) : (
              <Input
                id="first-name"
                placeholder="First Name"
                value={firstName || ""}
                onChange={(e) => setFirstName(e.target.value)}
              />
            )}
            <p className="text-muted-foreground text-xs">
              Your legal first name
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="last-name">Last Name</Label>
            {fullName ? (
              <Input
                id="last-name"
                placeholder={`${fullName?.split(" ")[1]}`}
                value={fullName?.split(" ")[1]}
                readOnly
              />
            ) : (
              <Input
                id="last-name"
                placeholder="Last Name"
                value={lastName || ""}
                onChange={(e) => setLastName(e.target.value)}
              />
            )}
            <p className="text-muted-foreground text-xs">
              Your legal last name
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              {email ? (
                <Input
                  id="email"
                  type="email"
                  placeholder={`${email}`}
                  value={email}
                  className="peer pr-9"
                  readOnly
                />
              ) : (
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder={`Enter your email`}
                    className="peer pr-9"
                    value={userEmail || ""}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                      setIsEmailVerified(false);
                    }}
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      {isEmailVerified ? (
                        <Button
                          variant="secondary"
                          className="cursor-pointer"
                          disabled
                        >
                          Verified
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={handleSendAnonymousOtp}
                        >
                          Verify
                        </Button>
                      )}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle>Verify your email</DialogTitle>
                        <DialogDescription>
                          Enter the code sent to your email address. Do not
                          refresh the page.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldGroup className="gap-4">
                        <Field className="gap-4">
                          <InputOTP
                            id="recoveryCode"
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                          >
                            <InputOTPGroup className="w-full justify-center gap-4 *:data-[slot=input-otp-slot]:rounded-lg *:data-[slot=input-otp-slot]:border">
                              <InputOTPSlot
                                index={0}
                                className="input-size-lg"
                              />
                              <InputOTPSlot
                                index={1}
                                className="input-size-lg"
                              />
                              <InputOTPSlot
                                index={2}
                                className="input-size-lg"
                              />
                              <InputOTPSlot
                                index={3}
                                className="input-size-lg"
                              />
                              <InputOTPSlot
                                index={4}
                                className="input-size-lg"
                              />
                              <InputOTPSlot
                                index={5}
                                className="input-size-lg"
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </Field>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline" className="cursor-pointer">
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            type="submit"
                            className="cursor-pointer"
                            onClick={handleVerifyAnonymousOtp}
                          >
                            Verify Email
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              {/* <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
                <MailIcon className="size-4" />
                <span className="sr-only">Email</span>
              </div> */}
            </div>
            <p className="text-muted-foreground text-xs">
              We&apos;ll never share your email with anyone else
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Workspace Setting */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="space-y-1">
          <h2 className="font-semibold">Report Details</h2>
          <p className="text-muted-foreground text-sm">
            Provide basic information about the issue you want to report.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-2">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="workspace-name">Report Title</Label>
            <Input
              id="workspace-name"
              placeholder="Report Title"
              value={reporttitle}
              onChange={(e) => setReportTitle(e.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              Give a short and clear title describing the issue
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="visibility">Report Category</Label>
            <Select
              defaultValue="Disaster Relief"
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger id="visibility" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Food Shortage">Food Shortage</SelectItem>
                  <SelectItem value="Water Crisis">Water Crisis</SelectItem>
                  <SelectItem value="Medical Emergency">
                    Medical Emergency
                  </SelectItem>
                  <SelectItem value="Shelter Needed">Shelter Needed</SelectItem>
                  <SelectItem value="Disaster Relief">
                    Disaster Relief
                  </SelectItem>
                  <SelectItem value="Education Support">
                    Education Support
                  </SelectItem>
                  <SelectItem value="Sanitation Issue">
                    Sanitation Issue
                  </SelectItem>
                  <SelectItem value="Women & Child Safety">
                    Women & Child Safety
                  </SelectItem>
                  <SelectItem value="Elderly Support">
                    Elderly Support
                  </SelectItem>
                  <SelectItem value="Animal Welfare">Animal Welfare</SelectItem>
                  <SelectItem value="Environmental Issue">
                    Environmental Issue
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs">
              Control who can access your workspace
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="123 Main St, Apt 4B"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              Street address with apartment or suite number
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="landmark">Landmark</Label>
            <Input
              id="landmark"
              placeholder="Near Central Park"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              Optional nearby landmark for easier location
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="locality">Locality</Label>
            <Combobox
              items={areas}
              value={selectedArea}
              onValueChange={(value) => {
                setSelectedArea(value ?? "");
              }}
            >
              <ComboboxInput placeholder="Select Locality" className="w-full" />
              <ComboboxContent>
                <ComboboxEmpty>No locality found.</ComboboxEmpty>
                <ComboboxList>
                  {areas.map((d) => (
                    <ComboboxItem key={d} value={d}>
                      {d}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="city">City</Label>
            <Combobox
              items={districts}
              value={selectedDistrict}
              onValueChange={(value) => {
                setSelectedDistrict(value ?? "");
                setSelectedArea("");
              }}
            >
              <ComboboxInput placeholder="Select District" className="w-full" />
              <ComboboxContent>
                <ComboboxEmpty>No district found.</ComboboxEmpty>
                <ComboboxList>
                  {districts.map((d) => (
                    <ComboboxItem key={d.name} value={d.name}>
                      {d.name}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="state">State</Label>
            <Combobox
              items={IndianStates.map((s) => s.name)}
              value={selectedState}
              onValueChange={(value) => {
                setSelectedState(value ?? "");
                setSelectedDistrict("");
                setSelectedArea("");
              }}
            >
              <ComboboxInput placeholder="Select State" className="w-full" />
              <ComboboxContent>
                <ComboboxEmpty>No state found.</ComboboxEmpty>
                <ComboboxList>
                  {IndianStates.map((s) => (
                    <ComboboxItem key={s.name} value={s.name}>
                      {s.name}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="country">Country</Label>
            <Combobox
              items={countries}
              value={country}
              onValueChange={(value) => {
                setCountry(value ?? "");
              }}
            >
              <ComboboxInput placeholder="Select Country" className="w-full" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {countries.map((item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="affectedpeople">Affected People</Label>
            <Input
              id="affectedpeople"
              type="number"
              placeholder="Number of affected people"
              value={affectedpeople}
              onChange={(e) => setAffectedPeople(e.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              Provide an estimation of the number of affected people.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="supportingimage">Supporting Images</Label>
            <Input
              id="supportingimage"
              type="file"
              accept="image/*"
              onChange={(e) => setSupportingImage(e.target.files?.[0] || null)}
            />
            <p className="text-muted-foreground text-xs">
              Supported formats: JPG, PNG, Maximum size 5MB
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="reportdescription">Report Description</Label>
            <Textarea
              placeholder="Report Description..."
              id="reportdescription"
              rows={4}
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              Provide detailed description of the report.
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto cursor-pointer"
          onClick={() => {
            router.push(`/dashboard`);
          }}
        >
          Cancel
        </Button>
        {loading ? (
          <Button disabled className="w-full sm:w-auto cursor-pointer">
            <Spinner /> Processing
          </Button>
        ) : (
          <Button type="submit" className="w-full sm:w-auto">
            Submit Report
          </Button>
        )}
      </div>
    </form>
  );
};

export default FormLayout;
