import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, PlusIcon } from 'lucide-react';
import { Card } from "@/components/ui/card"

type ContactInfoProps = React.ComponentProps<'div'> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
  decoration?: React.ReactNode;
};

export function ContactCard({
  title = 'Contact With Us',
  description = 'If you have any questions regarding our Services or need help, please fill out the form here.',
  contactInfo,
  className,
  formSectionClassName,
  decoration,
  children,
  ...props
}: ContactCardProps) {
  return (
    <Card className={cn('relative grid w-full md:grid-cols-2 lg:grid-cols-3', className)} {...props}>
      <PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-white/20" />
      <PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-white/20" />
      <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-white/20" />
      <PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-white/20" />
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-4 px-6 py-8 md:p-8">
          <h2 className="font-display text-3xl font-medium text-foreground tracking-tight md:text-4xl lg:text-5xl leading-[1.05]">
            {title}
          </h2>
          <p className="text-white/50 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl">
            {description}
          </p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 pt-2">
            {contactInfo?.slice(0, 1).map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
            {decoration && (
              <div className="md:col-span-2 lg:col-span-3 row-start-2 flex items-center justify-center border border-white/[0.06] bg-card p-2">
                {decoration}
              </div>
            )}
            {contactInfo?.slice(1).map((info, index) => (
              <ContactInfo key={index + 1} {...info} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex h-full w-full items-center border-t border-white/[0.06] p-6 md:col-span-1 md:border-t-0 md:border-l',
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </Card>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div className={cn('flex items-center gap-3 py-2', className)} {...props}>
      <div className="border border-white/[0.06] bg-card p-3">
        <Icon className="h-5 w-5 text-white/60" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-white/40">{value}</p>
      </div>
    </div>
  );
}
