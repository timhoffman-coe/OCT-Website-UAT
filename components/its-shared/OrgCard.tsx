import { User } from 'lucide-react';

interface OrgCardProps {
  name: string;
  title: string;
  email: string;
}

export default function OrgCard({ name, title, email }: OrgCardProps) {
  return (
    <div className="bg-[#F4F2F1] rounded-lg p-6 text-center">
      <User className="w-12 h-12 text-primary-blue mx-auto mb-4" aria-hidden="true" />
      <h4 className="font-sans text-lg font-bold text-gray-900 mb-0">{name}</h4>
      <p className="font-sans text-sm text-gray-600 mb-4">{title}</p>
      <a
        href={`mailto:${email}`}
        className="font-sans text-sm text-primary-blue hover:underline"
      >
        {email}
      </a>
    </div>
  );
}
