import { User } from 'lucide-react';

interface OrgCardProps {
  name: string;
  title: string;
  email: string;
}

export default function OrgCard({ name, title, email }: OrgCardProps) {
  return (
    <div className="bg-structural-light-gray rounded-lg p-6 text-center">
      <User className="w-12 h-12 text-primary-blue mx-auto mb-4" aria-hidden="true" />
      <h4 className="font-sans text-lg font-bold text-text-dark mb-0">{name}</h4>
      <p className="font-sans text-sm text-text-secondary mb-4">{title}</p>
      <a
        href={`mailto:${email}`}
        className="font-sans text-sm text-primary-blue hover:underline"
      >
        {email}
      </a>
    </div>
  );
}
