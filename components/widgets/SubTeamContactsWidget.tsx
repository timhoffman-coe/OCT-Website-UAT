import { User, UserCog } from 'lucide-react';

interface Contact {
  name: string;
  role: string;
  email: string;
}

interface SubTeamContactsWidgetProps {
  contacts: Contact[];
}

export default function SubTeamContactsWidget({ contacts }: SubTeamContactsWidgetProps) {
  if (contacts.length === 0) return null;
  return (
    <div className="bg-[#F4F2F1] rounded-md p-5">
      <h3 className="font-sans font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">
        Key Contacts
      </h3>
      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <div key={index} className="flex gap-3">
            {index === 0 ? (
              <User className="w-5 h-5 text-primary-blue mt-0.5 flex-shrink-0" />
            ) : (
              <UserCog className="w-5 h-5 text-primary-blue mt-0.5 flex-shrink-0" />
            )}
            <div>
              <h4 className="font-sans font-semibold text-sm text-gray-900">
                {contact.name}
              </h4>
              <span className="font-sans text-xs text-gray-500 block">
                {contact.role}
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="font-sans text-xs text-primary-blue hover:underline"
              >
                {contact.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
