import { useId } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

const DialogSignUpDemo = ({ data }: { data: any }) => {
  const id = useId();
  const [reportId, setReportId] = useState(data._id);
  const [actionsTaken, setActionsTaken] = useState(data.actionsTaken || "");
  const [outcome, setOutcome] = useState(data.outcome || "");
  const [noOfPeopleHelped, setNoOfPeopleHelped] = useState(data.noOfPeopleHelped || "");
  const [verificationPhoto, setVerificationPhoto] = useState<File | null>(null);
  const [remarks, setRemarks] = useState(data.remarks || "");
  const [open, setOpen] = useState(false);

  const handleFinalReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("reportId", reportId);
      formData.append("actionsTaken", actionsTaken);
      formData.append("outcome", outcome);
      formData.append("peopleHelped", noOfPeopleHelped);
      formData.append("remarks", remarks);
      if (verificationPhoto) {
        formData.append("image", verificationPhoto);
      }

      const response = await axiosInstance.post("/api/v1/finalreport/create", formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
      console.log(response.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          Submit Final Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={handleFinalReportSubmit}>
          <DialogHeader className="items-center">
            <DialogTitle>Final Report</DialogTitle>
            <DialogDescription>Please fill the form to submit the final report.</DialogDescription>
          </DialogHeader>
          <div className="my-4 space-y-2 text-center">
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p className="text-muted-foreground">{data.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-start gap-2 sm:col-span-2">
              <Field>
                <FieldLabel htmlFor="textarea-message">Actions Taken</FieldLabel>
                <FieldDescription>Enter the actions taken to address the issue.</FieldDescription>
                <Textarea
                  id="textarea-message"
                  placeholder="Enter the actions taken to address the issue."
                  value={actionsTaken}
                  onChange={(e) => setActionsTaken(e.target.value)}
                />
              </Field>
            </div>
            <div className="flex flex-col items-start gap-2 sm:col-span-2">
              <Field>
                <FieldLabel htmlFor="textarea-message">Outcome</FieldLabel>
                <FieldDescription>Enter the outcome of the actions taken.</FieldDescription>
                <Textarea
                  id="textarea-message"
                  placeholder="Enter the outcome of the actions taken."
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                />
              </Field>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Field>
                <FieldLabel htmlFor="input-field-username">No of People Helped</FieldLabel>
                <Input
                  id="input-field-username"
                  type="number"
                  placeholder="Enter the no of people helped"
                  value={noOfPeopleHelped}
                  onChange={(e) => setNoOfPeopleHelped(e.target.value)}
                />
                <FieldDescription>Enter the no of people helped.</FieldDescription>
              </Field>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Field>
                <FieldLabel htmlFor="input-field-verification-photo">Verification Photo</FieldLabel>
                <Input
                  id="input-field-verification-photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setVerificationPhoto(file);
                    }
                  }}
                />
                <FieldDescription>Choose a image for your report.</FieldDescription>
              </Field>
            </div>
            <div className="flex flex-col items-start gap-2 sm:col-span-2 mb-4">
              <Field>
                <FieldLabel htmlFor="input-field-username">Remarks</FieldLabel>
                <Input
                  id="input-field-username"
                  type="text"
                  placeholder="Enter your remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
                <FieldDescription>Enter the remarks</FieldDescription>
              </Field>
            </div>
          </div>
          <DialogFooter className="pt-4 sm:flex-col">
            <Button type="submit" className=" w-full cursor-pointer" onClick={() => setOpen(false)}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSignUpDemo;
