import type { ComponentType } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import { ShieldBan, Venus, FlameIcon, AmbulanceIcon, BabyIcon, PhoneCallIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const Features = [
  {
    icon: FlameIcon,
    title: "Fire Brigade",
    description: (
      <>
        Call <strong className="text-primary">101</strong> in case of fire emergencies. Immediate assistance for fire
        outbreaks, rescue operations, and hazard control.
      </>
    ),
    cardBorderColor: "border-red-600/40 hover:border-red-600",
    avatarTextColor: "text-red-600",
    avatarBgColor: "bg-red-600/10",
  },
  {
    icon: AmbulanceIcon,
    title: "Ambulance Services",
    description: (
      <>
        Dial <strong className="text-primary">102</strong> or <strong className="text-primary">108</strong> for
        emergency medical services. Quick response for accidents, health crises, and urgent care transport.
      </>
    ),
    cardBorderColor: "border-green-600/40 hover:border-green-600",
    avatarTextColor: "text-green-600",
    avatarBgColor: "bg-green-600/10",
  },
  {
    icon: ShieldBan,
    title: "Police Emergency",
    description: (
      <>
        Dial <strong className="text-primary">100</strong> for immediate police assistance. Report crimes, theft,
        violence, or any public safety concern instantly.
      </>
    ),
    cardBorderColor: "border-blue-600/40 hover:border-blue-600",
    avatarTextColor: "text-blue-600",
    avatarBgColor: "bg-blue-600/10",
  },
  {
    icon: Venus,
    title: "Women Helpline",
    description: (
      <>
        Call <strong className="text-primary">1091</strong> or <strong className="text-primary">181</strong> for women
        safety support. Assistance for harassment, domestic violence, and emergencies.
      </>
    ),
    cardBorderColor: "border-pink-600/40 hover:border-pink-600",
    avatarTextColor: "text-pink-600",
    avatarBgColor: "bg-pink-600/10",
  },
  {
    icon: BabyIcon,
    title: "Child Helpline",
    description: (
      <>
        Dial <strong className="text-primary">1098</strong> to report child abuse or distress. 24/7 support for children
        in need of care and protection.
      </>
    ),
    cardBorderColor: "border-yellow-600/40 hover:border-yellow-600",
    avatarTextColor: "text-yellow-600",
    avatarBgColor: "bg-yellow-600/10",
  },
  {
    icon: PhoneCallIcon,
    title: "National Emergency Number",
    description: (
      <>
        Dial <strong className="text-primary">112</strong> for all-in-one emergency services. Connects you to police,
        fire, and ambulance in a single call.
      </>
    ),
    cardBorderColor: "border-purple-600/40 hover:border-purple-600",
    avatarTextColor: "text-purple-600",
    avatarBgColor: "bg-purple-600/10",
  },
];

const Emergency = () => {
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-4 sm:mb-16 lg:mb-12">
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">Emergency Services</h2>
          <p className="text-muted-foreground text-xl">
            Access critical emergency contact information for immediate assistance. Stay prepared and informed with
            essential numbers for fire, medical, police, and more. Your safety is our priority.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Features.map((features, index) => (
            <Card key={index} className={cn("shadow-none transition-colors duration-300", features.cardBorderColor)}>
              <CardContent>
                <Avatar className="mb-6 size-10 rounded-md">
                  <AvatarFallback
                    className={cn("rounded-md [&>svg]:size-6", features.avatarBgColor, features.avatarTextColor)}
                  >
                    <features.icon />
                  </AvatarFallback>
                </Avatar>
                <h6 className="mb-2 text-lg font-semibold">{features.title}</h6>
                <p className="text-muted-foreground">{features.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Emergency;
