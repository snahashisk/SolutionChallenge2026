import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import axiosInstance from "@/lib/axios";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { countries } from "@/constant";
import { IndianStates } from "@/constant";
import { professions } from "@/constant";
import { educations } from "@/constant";
import { contributionAreas } from "@/constant";
import { Spinner } from "@/components/ui/spinner";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const [country, setCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [contributionArea, setContributionArea] = useState("");

  const [avatar, setAvatar] = useState<File | null>(null);
  const [idProof, setIdProof] = useState<File | null>(null);

  const stateData = IndianStates.find((s) => s.name === selectedState);
  const districts = stateData?.districts || [];
  const districtData = districts.find((d) => d.name === selectedDistrict);
  const areas = districtData?.areas || [];
  const [isLoading, setIsLoading] = useState(false);

  const passwordError = confirmPassword && password !== confirmPassword ? "Passwords do not match" : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      return;
    }
    const formData = new FormData();
    formData.append("fullName", fullName || "");
    formData.append("email", email || "");
    formData.append("password", password || "");
    formData.append("confirmPassword", confirmPassword || "");
    formData.append("phoneNumber", phoneNumber || "");
    formData.append("age", age || "");
    formData.append("address", address || "");
    formData.append("country", country || "");
    formData.append("state", selectedState || "");
    formData.append("city", selectedDistrict || "");
    formData.append("locality", selectedArea || "");
    formData.append("zipCode", zipCode || "");
    formData.append("gender", selectedGender || "");
    formData.append("education", education || "");
    formData.append("profession", profession || "");
    formData.append("contributionAreas", contributionArea || "");
    // ✅ Safe file handling
    if (avatar) {
      formData.append("avatar", avatar);
    }
    if (idProof) {
      formData.append("idProof", idProof);
    }
    // send to backend
    try {
      const response = await axiosInstance.post("/api/v1/user/register", formData, {
        withCredentials: true,
      });
      toast.success("User registered successfully");
      const userId = response.data.data._id;
      setIsLoading(false);
      router.push(`/verifyemail/${userId}`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">Fill in the form below to create your account</p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              required
              className="bg-background"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              required
              className="bg-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              required
              className="bg-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FieldDescription>Must be at least 8 characters long.</FieldDescription>
          </Field>

          <Field data-invalid={!!passwordError}>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              required
              className="bg-background"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {password === confirmPassword ? (
              <FieldDescription>Confirm your password</FieldDescription>
            ) : (
              <FieldDescription className="text-destructive">Password does not match</FieldDescription>
            )}
          </Field>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <Field>
            <FieldLabel htmlFor="phone-number">Phone Number</FieldLabel>
            <Input
              id="phone-number"
              type="text"
              placeholder="Enter phone number"
              className="bg-background"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="age">Age</FieldLabel>
            <Input
              id="age"
              type="number"
              placeholder="Enter age"
              className="bg-background"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="gender">Gender</FieldLabel>
            <Combobox
              items={["Male", "Female", "Other"]}
              value={selectedGender}
              onValueChange={(value) => {
                setSelectedGender(value ?? "");
              }}
            >
              <ComboboxInput placeholder="Select Gender" />
              <ComboboxContent>
                <ComboboxEmpty>No gender found.</ComboboxEmpty>
                <ComboboxList>
                  {["Male", "Female", "Other"].map((g) => (
                    <ComboboxItem key={g} value={g}>
                      {g}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="address">Address</FieldLabel>
          <Textarea
            id="address"
            placeholder="Enter address"
            className="bg-background"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Field>
        <div className="flex flex-col gap-4 md:flex-row">
          <Field>
            <FieldLabel htmlFor="state">State</FieldLabel>
            {/* <Input id="state" type="text" placeholder="Enter state" className="bg-background" /> */}
            <Combobox
              items={IndianStates.map((s) => s.name)}
              value={selectedState}
              onValueChange={(value) => {
                setSelectedState(value ?? "");
                setSelectedDistrict("");
                setSelectedArea("");
              }}
            >
              <ComboboxInput placeholder="Select State" />
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
          </Field>
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            {/* <Input id="city" type="text" placeholder="Enter city" className="bg-background" /> */}
            <Combobox
              items={districts}
              value={selectedDistrict}
              onValueChange={(value) => {
                setSelectedDistrict(value ?? "");
                setSelectedArea("");
              }}
            >
              <ComboboxInput placeholder="Select District" />
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
          </Field>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <Field>
            <FieldLabel htmlFor="locality">Locality</FieldLabel>
            {/* <Input id="city" type="text" placeholder="Enter city" className="bg-background" /> */}
            <Combobox
              items={areas}
              value={selectedArea}
              onValueChange={(value) => {
                setSelectedArea(value ?? "");
              }}
            >
              <ComboboxInput placeholder="Select Locality" />
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
          </Field>
          <Field>
            <FieldLabel htmlFor="zip-code">Zipcode</FieldLabel>
            <Input
              id="zip-code"
              type="text"
              placeholder="Enter zipcode"
              className="bg-background"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <Combobox
              items={countries}
              value={country}
              onValueChange={(value) => {
                setCountry(value ?? "");
              }}
            >
              <ComboboxInput placeholder="Select Country" />
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
          </Field>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <Field>
            <FieldLabel htmlFor="education">Education</FieldLabel>
            <Combobox items={educations} value={education} onValueChange={(value) => setEducation(value ?? "")}>
              <ComboboxInput placeholder="Select Education" />
              <ComboboxContent>
                <ComboboxEmpty>No education found.</ComboboxEmpty>
                <ComboboxList>
                  {educations.map((item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
          <Field>
            <FieldLabel htmlFor="profession">Profession</FieldLabel>
            <Combobox items={professions} value={profession} onValueChange={(value) => setProfession(value ?? "")}>
              <ComboboxInput placeholder="Select Profession" />
              <ComboboxContent>
                <ComboboxEmpty>No profession found.</ComboboxEmpty>
                <ComboboxList>
                  {professions.map((item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="contributionAreas">Contribution Areas</FieldLabel>
          <Combobox
            items={contributionAreas}
            value={contributionArea}
            onValueChange={(value) => setContributionArea(value ?? "")}
          >
            <ComboboxInput placeholder="Select Contribution Areas" />
            <ComboboxContent>
              <ComboboxEmpty>No contribution areas found.</ComboboxEmpty>
              <ComboboxList>
                {contributionAreas.map((item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
        <div className="flex flex-col gap-4 md:flex-row">
          <Field>
            <FieldLabel htmlFor="picture">Avatar</FieldLabel>
            <Input id="picture" type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] ?? null)} />
            <FieldDescription>Select an avatar to upload.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="idProof">ID Proof</FieldLabel>
            <Input
              id="idProof"
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) => setIdProof(e.target.files?.[0] ?? null)}
            />
            <FieldDescription>Select an id proof to upload.</FieldDescription>
          </Field>
        </div>

        <Field>
          {isLoading ? (
            <Spinner />
          ) : (
            <Button type="submit" className="cursor-pointer">
              Create Account
            </Button>
          )}
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button" className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Sign up with Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
